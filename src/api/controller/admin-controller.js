const adminService = require("../service/admin-service")

const allAdmin = async (req, res) => {
    try {
        const result = await adminService.getAllAdmin();
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        console.log(e);
    }
}

const login = async (req, res) => {
    try {
        const body = req.body;
        const result = await adminService.loginAdmin(body);
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        console.log(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const user = req.user;
        await adminService.logoutAdmin(user.username)
        res.json({
            status: 200,
            message: "Successfully Logout"
        })
    } catch (e) {
        next(e)
    }
}

const createNewMahasiswa = async (req, res) => {
    try {
        const body = req.body;
        const result = await adminService.createMahasiswa(body);
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        console.log(e);
    }
}

const getAllMahasiswa = async (req, res, next) => {
    try {
        const result = await adminService.getAllMahasiswa();
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        next(e)
    }
}

const updateInactiveMahasiswa = async (req, res, next) => {
    try {
        const nim = req.body.nim;
        const result = await adminService.updateInactiveMahasiswa(nim)
        res.json({
            status: 200,
            data: result,
            message: "Update Mahasiswa Inactive Successfully"
        })
    } catch (e) {
        next(e)
    }
}

const updateActiveMahasiswa = async (req, res, next) => {
    try {
        const nim = req.body.nim;
        const result = await adminService.updateActiveMahasiswa(nim)
        res.json({
            status: 200,
            data: result,
            message: "Update Mahasiswa Active Successfully"
        })
    } catch (e) {
        next(e)
    }
}

const getMahasiswaFilter = async (req, res, next) => {
    try {
        const query = req.query;
        const result = await adminService.getMahasiswaByFilter(query);
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    allAdmin,
    login,
    logout,
    createNewMahasiswa,
    getAllMahasiswa,
    updateInactiveMahasiswa,
    updateActiveMahasiswa,
    getMahasiswaFilter
}