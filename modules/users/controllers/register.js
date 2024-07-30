const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

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

    await emailManager(createdUser.email,
                        "Welcome to expense tracker. We hope you can manage your expense easily from our platform!",
                        "<h1>Welcome to expense tracker.</h1> <br/><br/> We hope you can manage your expense easily from our platform!",
                        "Welcome to expense tracker!"
    )

    res.status(201).json({
        status: "seccess",
        message: "User register successfully!",
        accessToken: accessToken
    });
};

module.exports = register;