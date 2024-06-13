const express = require('express');
const router = express.Router();
const authController = require('../controller/Auth/authController');
const auth = require('../middlewares/auth');
const productController = require('../controller/ProductController/productController');
const employeeController = require('../controller/EmployeeController/employeeController');
const InventoryController = require('../controller/InventoryController/inventoryController');
const MilkController = require('../controller/MilkController/MilkController');
const AnimalController = require('../controller/AnimalController/AnimalController')
const MilkSale = require('../models/milkSale');
const ECommerceSale = require('../models/eCommerceSale');
const LossProfitController = require('../controller/Loss&Profit/Loss&Profit');
const MeatAnimalController = require('../controller/MeatController/MeatController');
const WeightUpdateController = require('../controller/WeightController/WeightUpdateController');
const ExpenseController = require('../controller/ExpenseController/expenseController');
const SaleController = require('../controller/SaleController/saleController');
const diseaseController = require('../controller/DiseaseController/diseaseController');

// Router for Auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);
router.get('/refresh', authController.refresh);
router.get('/dashboard/manage_admin', authController.getAllAdmin);
router.post('/dashboard/manage_admin/add_admin', auth, authController.register);
router.post('/dashboard/manage_admin/edit_admin', auth, authController.editAdmin);
router.delete('/dashboard/manage_admin/:id', auth, authController.deleteAdmin);

// Router for Milk Animal
router.get('/dashboard/manage_animal', auth,  AnimalController.getAllAnimals);
router.post('/dashboard/manage_animal/add_animal', auth, AnimalController.addAnimal);
router.delete('/dashboard/manage_animal/:id', auth, AnimalController.deleteAnimal);

// Router for Employee
router.get('/dashboard/manage_employee', auth, employeeController.getAllEmployees);
router.post('/dashboard/manage_employee/add_employee',auth, employeeController.addEmployee);

// Router for Product
router.post('/dashboard/manage_product/add_product', auth, productController.addProduct);
router.get('/dashboard/manage_product', auth, productController.getAllProducts);

// Router for Meat Animals
router.get('/dashboard/manage_meat', auth, MeatAnimalController.getAllMeatAnimals);
router.post('/dashboard/manage_meat/add_meat', auth, MeatAnimalController.addMeatAnimal);
// router.delete('/dashboard/manage_meat/:id', auth, meatAnimalController.deleteMeatAnimal);

// Router for Update Weight
router.post('/dashboard/add_weight', auth, WeightUpdateController.updateWeight);


// Router for Inventory 
router.get('/dashboard/manage_inventory', auth, InventoryController.getAllInventory);
router.post('/dashboard/manage_inventory/add_inventory', auth, InventoryController.addingInventory);
router.put('/dashboard/manage_inventory/edit_inventory', auth, InventoryController.editInventory);
router.delete('/dashboard/manage_inventory/:id', auth, InventoryController.deleteInventory);

// Router for Milk
router.get('/dashboard/manage_milk', auth, MilkController.getAllMilk);
router.post('/dashboard/manage_milk/add_milk', auth, MilkController.addingMilk);

// Router for Loss and Profit
router.post('/dashboard/loss_profit', auth, LossProfitController.calculateLossProfit);

// Router for Disease
router.post('/dashboard/disease_detection/disease_by_symptom', auth, diseaseController.detectDisease);

// Router for Expense
router.get('/dashboard/manage_expense', auth, ExpenseController.getAllExpenses);
router.post('/dashboard/manage_expense/add_expense', auth, ExpenseController.addExpense);

// Router for Sale
router.get('/dashboard/manage_sale', auth, SaleController.getAllMilkSales);
router.post('/dashboard/manage_sale/add_sale', auth, SaleController.addMilkSale);


module.exports = router;