const register = (req, res) => {

    res.status(200).json({
        status: "hello from register"
    });
};

module.exports = register;