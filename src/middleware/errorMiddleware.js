const { ResponseError } = require("../api/utilities/error/ResponseError");

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            status: false,
            data: {},
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            status: false,
            data: {},
            errors: err.message
        })
    }
}

module.exports = {
    errorMiddleware
}