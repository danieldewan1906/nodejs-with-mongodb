const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const Admin = require("../api/models/admin")
const Mahasiswa = require("../api/models/mahasiswa")
dotenv.config()

const authentication = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split(" ")[1]
            jwt.verify(jwtToken, process.env.SECRET_KEY)
            const userAdmin = await Admin.findOne({
                token: jwtToken
            }).select("username")

            const userMahasiswa = await Mahasiswa.findOne({
                token: jwtToken
            }).select("nim")

            if (!userAdmin && !userMahasiswa) {
                res.json({
                    status: 401,
                    message: "UNAUTHORIZED"
                }).end()
            } else if (userAdmin){
                req.user = userAdmin
                next()
            } else {
                req.user = userMahasiswa
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

const checkAdmin = async (req, res, next) => {
    const user = req.user;
    if (user.username !== undefined) {
        next();
    } else {
        res.json({
            status: 401,
            message: "You don't have permission"
        }).end();
    }
}

const checkMahasiswa = async (req, res, next) => {
    const user = req.user;
    if (user.nim !== undefined) {
        next();
    } else {
        res.json({
            status: 401,
            message: "You don't have permission"
        }).end();
    }
}

module.exports = {
    authentication,
    checkAdmin,
    checkMahasiswa
}