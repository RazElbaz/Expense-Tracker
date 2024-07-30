const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");

const transactionRoutes = express.Router();

// Routes..


transactionRoutes.use(auth);

// Protected routes...
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);

module.exports = transactionRoutes;