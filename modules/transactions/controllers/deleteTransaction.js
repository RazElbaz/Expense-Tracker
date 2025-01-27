const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {

    const usersModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");

    const { transaction_id } = req.params;

    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid transaction id!";

    const getTransaction = await transactionModel.findOne({
        _id: transaction_id
    });

    if(!getTransaction) throw "Transaction not found!";

    console.log(getTransaction);

    if(getTransaction.transaction_type === "income"){
        await usersModel.updateOne({
            _id: getTransaction.user_id
        },{
            $inc:{
                balance: getTransaction.amount * (-1)
            }
        },{
            runValidators: true
        }
        );
    } else {
        await usersModel.updateOne({
            _id: getTransaction.user_id
        },{
            $inc:{
                balance: getTransaction.amount
            }
        },{
            runValidators: true
        }
        );
    }
    
    await transactionModel.deleteOne({
        _id: transaction_id
    });

    res.status(200).json({
        status: "Deleted successfully!"
    });
};

module.exports = deleteTransaction;