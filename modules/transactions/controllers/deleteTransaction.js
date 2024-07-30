const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
    const transactionModel = mongoose.model("transactions");

    const { transaction_id } = req.params;

    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid transaction id!";

    const getTransaction = await transactionModel.findOne({
        _id: transaction_id
    });

    if(!getTransaction) throw "Transaction not found!";

    await transactionModel.deleteOne({
        _id: transaction_id
    });

    res.status(200).json({
        status: "Deleted successfully!"
    });
};

module.exports = deleteTransaction;