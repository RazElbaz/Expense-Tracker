const mongoose = require("mongoose");

const userDashboard = async (req, res) => {

    const usersModel = mongoose.model("users");

    const getUser = await usersModel
    .findOne({
        _id: req.user._id
    })
    .select("-password") // we dont want to send the password in the response or .select("name balance email"); // option 2
    


    console.log(req.user);

    res.status(200).json({
        status: "success",
        data: getUser
    });
};

module.exports = userDashboard;