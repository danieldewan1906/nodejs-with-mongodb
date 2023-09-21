const express = require('express');
const adminRoute = express.Router()
const adminController = require("../../controller/admin-controller");
const { authentication, checkAdmin } = require('../../../middleware/authenticationMiddleware');

adminRoute.get("/admin", authentication, checkAdmin, adminController.allAdmin)
adminRoute.post("/admin/login", adminController.login)
adminRoute.post("/admin/logout", authentication, checkAdmin, adminController.logout)
adminRoute.post("/admin/mahasiswa", authentication, checkAdmin, adminController.createNewMahasiswa)
adminRoute.get("/admin/mahasiswa", authentication, checkAdmin, adminController.getAllMahasiswa)
adminRoute.put("/admin/mahasiswa/inactive", authentication, checkAdmin, adminController.updateInactiveMahasiswa)
adminRoute.put("/admin/mahasiswa/active", authentication, checkAdmin, adminController.updateActiveMahasiswa)
adminRoute.get("/admin/mahasiswa/filter", authentication, checkAdmin, adminController.getMahasiswaFilter)

module.exports = () => adminRoute