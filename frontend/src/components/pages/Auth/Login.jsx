import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage1 from "../../../assets/background1.jpg";
import backgroundImage2 from "../../../assets/background2.jpg";
import { login } from "../../../api/internal";
import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import Navbar from "../../Navbar/Navbar";
import loginSchema from "../../../schemas/loginSchema";

const Login = () => {
  const [currentBackground, setCurrentBackground] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((current) => (current === 1 ? 2 : 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundStyle = () => {
    const backgroundImage =
      currentBackground === 1
        ? `url(${backgroundImage1})`
        : `url(${backgroundImage2})`;
    return {
      backgroundImage,
    };
  };

  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await login(data);

    if (response.status === 200) {
      const user = {
        _id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      navigate("/dashboard");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  return (
    <div style={getBackgroundStyle()} className="bg-cover bg-center bg-no-repeat h-screen">
      <Navbar />
      <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] bg-opacity-80 shadow-md m-auto overflow-hidden sm:rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <TextInput
          type="email"
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
          className="mb-4"
        />
        <TextInput
          type="password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
          className="mb-4"
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleLogin}
          >
            SignIn
          </button>
        </div>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
        {error !== "" && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
