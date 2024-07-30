const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");

const userRoute = express.Router();

// Routes..
userRoute.post("/register", register);
userRoute.post("/login", login);

userRoute.use(auth);

// Protected routes...
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;