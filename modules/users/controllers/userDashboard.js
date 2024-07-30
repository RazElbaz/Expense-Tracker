const mongoose = require("mongoose");

const userDashboard = async (req, res) => {

    const usersModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");

    const getUser = await usersModel
    .findOne({
        _id: req.user._id
    })
    .select("-password") // we dont want to send the password in the response or .select("name balance email"); // option 2
    
    const transactions = await transactionModel
    .find({
        user_id: req.user._id
    })
    .sort("-createdAt")
    .limit(5);

    res.status(200).json({
        status: "success",
        data: getUser,
        transactions // this equal to transactions: transactions
    });
};

module.exports = userDashboard;