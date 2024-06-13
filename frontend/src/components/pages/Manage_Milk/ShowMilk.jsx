import { useState, useEffect } from "react";
import { getAllMilk } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowMilk() {
  const navigate = useNavigate();
  const [milks, setMilks] = useState([]);

  useEffect(() => {
    (async function getAllMilksApiCall() {
      try {
        const response = await getAllMilk();

        if (response.status === 200) {
          setMilks(response.data.milks);
        } else {
          console.error("Error fetching milks:", response);
        }
      } catch (error) {
        console.error("Error fetching milks:", error);
      }
    })();
  }, []);

  const handleNewMilk = () => {
    navigate('/dashboard/manage_milk/add_milk');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewMilk}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Milk
        </button>
      </div>
      {milks.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {milks.map((milk) => (
            <div
              key={milk.animal_code}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Animal Type:</strong> {milk.animalType}</p>
              <p><strong>Animal Code:</strong> {milk.animal_code}</p>
              <p><strong>Date:</strong> {milk.date}</p>
              <p><strong>Time:</strong> {milk.time}</p>
              <p><strong>Quantity:</strong> {milk.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowMilk;
