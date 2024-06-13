import { useState, useEffect } from "react";
import { getAllEmployees } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowEmployee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async function getAllEmployeesApiCall() {
      try {
        const response = await getAllEmployees();
  
        if (response.status === 200) {
          if (Array.isArray(response.data.employees)) {
            setEmployees(response.data.employees);
          } else {
            console.error("API response 'employees' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching employees:", response);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    })();
  }, []);
  

  const handleNewEmployee = () => {
    navigate('/dashboard/manage_employee/add_employee');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewEmployee}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Employee
        </button>
      </div>
      {employees.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Salary:</strong> {employee.salary}</p>
              <p><strong>Hire Date:</strong> {employee.hireDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowEmployee;
