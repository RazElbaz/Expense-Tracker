const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");

const userRoute = express.Router();

//Routes..
userRoute.post("/register", register);
userRoute.post("/login", login);

module.exports = userRoute;