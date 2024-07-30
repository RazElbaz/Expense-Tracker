const mongoose = require("mongoose");


const getTransactions = async (req, res) => {
    const transactionModel = mongoose.model("transactions");

    const transactions = await transactionModel.find({
        user_id: req.user._id,
        ...req.query //this filter by the request query: ?transaction_type=income or ?transaction_type=expense&amount=10
    }); 



    res.status(200).json({
        status: "success",
        data: transactions
    });

};

module.exports = getTransactions;