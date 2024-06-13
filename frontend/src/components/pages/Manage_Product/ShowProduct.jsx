import { useState, useEffect } from "react";
import { getAllProducts } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getAllProductsApiCall() {
      try {
        const response = await getAllProducts();
  
        if (response.status === 200) {
          if (Array.isArray(response.data.products)) {
            setProducts(response.data.products);
          } else {
            console.error("API response 'products' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching products:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);
  

  const handleNewProduct = () => {
    navigate('/dashboard/manage_product/add_product');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewProduct}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Product
        </button>
      </div>
      {products.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Product Name:</strong> {product.product_name}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Expiry Date:</strong> {product.expiry_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowProduct;
