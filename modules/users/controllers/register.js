const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const register = async (req, res) => {
    const usersModel = mongoose.model("users");

    const { name, email, password, confirm_password, balance } = req.body;


    //validations..
    if(!email) throw "Email must be provided!";
    if(!password) throw "Password must be provided!";
    if(password.length < 5) throw "Password must be at least 5 character long.";

    if(!name) throw "Name must be provided!";

    if(password !== confirm_password) throw "Password and confirmed password doesnt mathch!";

    const getDuplicateEmail = await usersModel.findOne({
        email: email
    })

    if(getDuplicateEmail) throw "This email already exist!";

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await usersModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance: balance
    });

    const accessToken = await jsonwebtoken.sign({ 
        _id: createdUser._id,
        name: createdUser.name
    }, process.env.jwt_salt
    );

    
    res.status(201).json({
        status: "seccess",
        message: "User register successfully!",
        accessToken: accessToken
    });
};

module.exports = register;