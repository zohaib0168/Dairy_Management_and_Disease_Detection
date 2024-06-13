import { useState, useEffect } from "react";
import { getAllInventory, deleteInventory } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowInventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async function getAllInventorysApiCall() {
      try {
        const response = await getAllInventory();
        
        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedItems = response.data.inventory || [];
          console.log("Fetched items:", fetchedItems);
          setItems(fetchedItems);
        } else {
          console.error("Error fetching inventories:", response);
        }
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    })();
  }, []);

  const handleEditInventory = (id) => {
    navigate(`/dashboard/manage_inventory/edit_inventory/${id}`);
  };

  const handleDeleteInventory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        const response = await deleteInventory(id);
        if (response.status === 200) {
          setItems(items.filter((item) => item._id !== id));
          navigate('/dashboard/manage_inventory');
        } else {
          console.error("Error deleting inventories:", response);
        }
      } catch (error) {
        console.error("Error deleting inventories:", error);
      }
    }
  };

  const handleAddNewInventory = () => {
    navigate('/dashboard/manage_inventory/add_inventory');
  };

  console.log("Rendering items:", items);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewInventory}
        >
          Add New Inventory
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            > 
              <p><strong>Item Name:</strong> {item.itemName}</p>
              <p><strong>Stock:</strong> {item.stock}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditInventory(item._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteInventory(item._id)}
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

export default ShowInventory;
