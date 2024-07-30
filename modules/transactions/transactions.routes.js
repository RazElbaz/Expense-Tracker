const express = require("express");

const auth = require("../../middleware/auth");

const transactionRoutes = express.Router();

// Routes..


transactionRoutes.use(auth);

// Protected routes...


module.exports = transactionRoutes;