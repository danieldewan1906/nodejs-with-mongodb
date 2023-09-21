const express = require("express")
const mahasiswaRoute = express.Router()
const mahasiswaController = require("../../controller/mahasiswa-controller.js");
const { authentication, checkMahasiswa } = require("../../../middleware/authenticationMiddleware.js");

mahasiswaRoute.post("/mahasiswa/login", mahasiswaController.loginMahasiswa);
mahasiswaRoute.post("/mahasiswa/logout", authentication, checkMahasiswa, mahasiswaController.logoutMahasiswa);
mahasiswaRoute.get("/mahasiswa/current", authentication, checkMahasiswa, mahasiswaController.getMahasiswa)
mahasiswaRoute.put("/mahasiswa/current", authentication, checkMahasiswa, mahasiswaController.updateMahasiswa)

module.exports = () => mahasiswaRoute
