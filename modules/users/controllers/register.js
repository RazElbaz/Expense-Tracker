const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const nodemailer = require("nodemailer");

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

    const accessToken = jwtManager(createdUser);  //the jwt manager will create an access to this createdUser or the user object

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f8b08fd760fa15",
          pass: "94fcf037ad6da8"
        }
      });

    await transport.sendMail({
        to: createdUser.email,
        from: "info@expensetracker.com",
        text: "Welcome to expense tracker. We hope you can manage your expense easily from our platform!",
        html: "<h1>Welcome to expense tracker.</h1> <br/><br/> We hope you can manage your expense easily from our platform!",
        subject: "Welcome to expense tracker!"
    });


    res.status(201).json({
        status: "seccess",
        message: "User register successfully!",
        accessToken: accessToken
    });
};

module.exports = register;