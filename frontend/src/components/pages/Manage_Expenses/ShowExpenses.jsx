import { useState, useEffect } from "react";
import { getAllExpense } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowExpense() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async function getAllExpensesApiCall() {
      try {
        const response = await getAllExpense();

        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedExpenses = response.data.expenses || [];
          console.log("Fetched items:", fetchedExpenses);
          setExpenses(fetchedExpenses);
        } else {
          console.error("Error fetching expenses:", response);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    })();
  }, []);

  const handleAddNewExpense = () => {
    navigate('/dashboard/manage_expense/add_expense');
  };

  console.log("Rendering expenses:", expenses);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewExpense}
        >
          Add New Expense
        </button>
      </div>
      {expenses.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p><strong>Expense Type:</strong> {expense.expenseType}</p>
              <p><strong>Amount:</strong> {expense.amount}</p>
              <p><strong>Date Incurred:</strong> {new Date(expense.dateIncurred).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowExpense;
