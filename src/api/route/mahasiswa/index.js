const express = require("express")
const mahasiswaRouter = express.Router();
const mahasiswaAPI = require("./mahasiswa")

mahasiswaRouter.use(mahasiswaAPI())

module.exports = () => mahasiswaRouter