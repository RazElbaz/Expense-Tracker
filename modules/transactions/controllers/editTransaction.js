const mongoose = require("mongoose");
const validator = require("validator");


const editTransaction = async (req, res) => {

    const usersModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");

    const { transaction_id, remarks, amount, transaction_type } = req.body;

    // transaction_id validation
    if(!transaction_id) throw "Transaction id is required!";
    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid transaction id!";

    // transaction_type validation
    if(transaction_type !== "income" && transaction_type !== "expense") throw "Transation type must be income or expense!";

    // remarks validation
    if(remarks && remarks.length < 5) throw "Remarks must be at least 5 characters long!";
    
    // amount validation
    if(!validator.isNumeric(amount.toString())) throw "Amount must be a valid number.";
    if(amount < 0) throw "Amount must not be negative.";

    const getTransaction = await transactionModel.findOne({
        _id: transaction_id
    });

    if(!getTransaction) throw "Transaction not found!";

    if(getTransaction.transaction_type === "income"){
        await usersModel.updateOne({
            _id: getTransaction.user_id
        },{
            $inc:{
                balance: amount - getTransaction.amount 
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
                balance: ( amount - getTransaction.amount ) * (-1)
            }
        },{
            runValidators: true
        }
        );
    }

    await transactionModel.updateOne({
        _id: transaction_id
    },{
        remarks: remarks,
        transaction_type: transaction_type,
        amount: amount
    }, {
        runValidators: true
    });


    res.status(200).json({
        status: "Edit transaction!"
    });
};

module.exports = editTransaction;