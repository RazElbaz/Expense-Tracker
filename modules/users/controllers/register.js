const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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

    await usersModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance: balance
    });
    
    res.status(201).json({
        status: "seccess",
        message: "User register successfully!"
    });
};

module.exports = register;