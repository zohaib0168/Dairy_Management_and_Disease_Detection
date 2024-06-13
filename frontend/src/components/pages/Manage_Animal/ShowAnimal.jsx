import { useState, useEffect } from "react";
import { getAllAnimal, deleteAnimal } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowAnimal() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    (async function getAllAnimalsApiCall() {
      try {
        const response = await getAllAnimal(); 

        if (response.status === 200) {
          setAnimals(response.data.animals);
        } else {
          console.error("Error fetching animals:", response);
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    })();
  }, []);

  const handleEditAnimal = (id) => {
    navigate(`/dashboard/manage_animal/edit_animal/${id}`);
  };

  const handleDeleteAnimal = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this animal?");
    if (!confirmDelete) {
      return; // If the user cancels, exit the function
    }
    
    try {
      const response = await deleteAnimal(id);
      if (response.status === 200) {
        setAnimals(animals.filter((animal) => animal._id !== id));
        navigate('/dashboard/manage_animal')
      } else {
        console.error("Error deleting animal:", response);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  const handleAddNewAnimal = () => {
    navigate('/dashboard/manage_animal/add_animal');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewAnimal}
        >
          Add New Animal
        </button>
      </div>
      {animals.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <div
              key={animal._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            > 
              <p><strong>Animal Type:</strong> {animal.animalType}</p>
              <p><strong>Animal Code:</strong> {animal.animal_code}</p>
              <p><strong>Breed:</strong> {animal.breed}</p>
              <p><strong>Weight:</strong> {animal.weight}</p>
              <p><strong>Average Milk:</strong> {animal.avg_milk}</p>
              <p><strong>Purchase Price:</strong> {animal.purchase_price}</p>
              <p><strong>With Calf:</strong> {animal.with_calf}</p>
              <p><strong>Age:</strong> {animal.age}</p>
              <p><strong>Milking Status:</strong> {animal.milking_status}</p>
              <p><strong>Purchase Date:</strong> {animal.purchase_date ? new Date(animal.purchase_date).toLocaleDateString() : 'N/A'}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditAnimal(animal._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteAnimal(animal._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAnimal;
