const errorHandler = (error, req, res, next) => {
    if(error){
        res.status.json({
            status: "faild",
            message: error
        })
    } else {
        next();
    }
};


module.exports = errorHandler;