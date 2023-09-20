const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const Admin = require("../api/models/admin")
dotenv.config()

const authentication = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split(" ")[1]
            jwt.verify(jwtToken, process.env.SECRET_KEY)
            const user = await Admin.findOne({
                token: jwtToken
            }).select("username")

            if (!user) {
                res.json({
                    status: 401,
                    message: "UNAUTHORIZED"
                }).end()
            } else {
                req.user = user
                next()
            }
        } else {
            res.json({
                status: 401,
                message: "UNAUTHORIZED"
            }).end()
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.json({
                status: 401,
                errors: "Session Timed Out. Please Login Again"
            }).end();
        }
    }
}

module.exports = {
    authentication
}