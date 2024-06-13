import { useState, useEffect } from "react";
import { getAllSales } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowSale() {
  const navigate = useNavigate();
  const [milkSales, setMilkSales] = useState([]);

  useEffect(() => {
    (async function getAllMilkSalesApiCall() {
      try {
        const response = await getAllSales();

        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedMilkSales = response.data.milkSales || [];
          console.log("Fetched items:", fetchedMilkSales);
          setMilkSales(fetchedMilkSales);
        } else {
          console.error("Error fetching milk sales:", response);
        }
      } catch (error) {
        console.error("Error fetching milk sales:", error);
      }
    })();
  }, []);

  const handleAddNewMilkSale = () => {
    navigate('/dashboard/manage_sale/add_sale');
  };

  console.log("Rendering milk sales:", milkSales);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewMilkSale}
        >
          Add New Milk Sale
        </button>
      </div>
      {milkSales.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milkSales.map((sale) => (
            <div
              key={sale._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Customer Name:</strong> {sale.customerName}</p>
              <p><strong>Quantity:</strong> {sale.quantity}</p>
              <p><strong>Price Per Liter:</strong> {sale.pricePerLiter}</p>
              <p><strong>Total Sale:</strong> {sale.totalSale}</p>
              <p><strong>Date:</strong> {new Date(sale.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowSale;
