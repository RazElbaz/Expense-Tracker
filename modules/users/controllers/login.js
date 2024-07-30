const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const login = async (req,res) => {
    const usersModel = mongoose.model("users");

    const { email, password } = req.body;

    const getUser = await usersModel.findOne({
        email: email
    });

    if(!getUser) throw "This email does not exist in the system!";

    const comparePassword = await bycrypt.compare(password, getUser.password);
    
    if(!comparePassword) throw "Email and password do not match!";

    res.status(200).json({
        status: "User logged in successfully!"
    });
};

module.exports = login;