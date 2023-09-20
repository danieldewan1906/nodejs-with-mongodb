const express = require('express');
const adminRoute = express.Router()
const adminController = require("../../controller/admin-controller");
const { authentication } = require('../../../middleware/authenticationMiddleware');

adminRoute.get("/admin", authentication, adminController.allAdmin)
adminRoute.post("/admin/login", adminController.login)
adminRoute.post("/admin/logout", authentication, adminController.logout)
adminRoute.post("/admin/mahasiswa", authentication, adminController.createNewMahasiswa)
adminRoute.get("/admin/mahasiswa", authentication, adminController.getAllMahasiswa)
adminRoute.put("/admin/mahasiswa/inactive", authentication, adminController.updateInactiveMahasiswa)
adminRoute.put("/admin/mahasiswa/active", authentication, adminController.updateActiveMahasiswa)

module.exports = () => adminRoute