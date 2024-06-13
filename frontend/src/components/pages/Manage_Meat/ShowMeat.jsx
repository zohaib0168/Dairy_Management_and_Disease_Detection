import { useState, useEffect } from "react";
import { getAllMeatAnimals } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowMeat() {
  const navigate = useNavigate();
  const [meats, setMeats] = useState([]);

  useEffect(() => {
    (async function getAllMeatsApiCall() {
      try {
        const response = await getAllMeatAnimals();
  
        if (response.status === 200) {
          // Check if the 'meats' property exists and is an array
          if (Array.isArray(response.data.meats)) {
            setMeats(response.data.meats);
          } else {
            console.error("API response 'meats' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching meats:", response);
        }
      } catch (error) {
        console.error("Error fetching meats:", error);
      }
    })();
  }, []);
  

  const handleNewMeat = () => {
    navigate('/dashboard/manage_meat/add_meat');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewMeat}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Meat
        </button>
      </div>
      {meats.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {meats.map((meat) => (
            <div
              key={meat.animal_code}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Animal Type:</strong> {meat.animalType}</p>
              <p><strong>Animal Code:</strong> {meat.animal_code}</p>
              <p><strong>Sex:</strong> {meat.sex}</p>
              <p><strong>Weight:</strong> {meat.weight}</p>
              <p><strong>Purchase Price:</strong> {meat.purchase_price}</p>
              <p><strong>Purchase Date:</strong> {meat.purchase_date}</p>
              <p><strong>Age:</strong> {meat.age}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowMeat;
