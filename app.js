require("express-async-errors");

const express = require("express");
const errorHandler = require("./handlers/errorHandler");

require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");


// connecting to mongoDB
mongoose
.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mydbdata.ecizwhr.mongodb.net/expensetrackerdb?retryWrites=true&w=majority&appName=mydbdata`
    ,{}
)
.then(() => {
    console.log("Connection to mongoDB successful!");
})
.catch(() => {
    console.log("Connection to mongoDB failed!");
})


const app = express();

app.use(express.json());


//Models ..

require("./models/users.model");
require("./models/transactions.model");


//Routes ..
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//End of all routes...
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "failed",
        error: "Not found!",
      });
});

app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server stated successfully!");
})