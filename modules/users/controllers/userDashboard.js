const userDashboard = (req, res) => {

    console.log(req.user);

    res.status(200).json({
        status: "Hello from userDashboard"
    });
};

module.exports = userDashboard;