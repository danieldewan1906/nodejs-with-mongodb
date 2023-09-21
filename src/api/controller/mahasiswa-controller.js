const mahasiswaService = require("../service/mahasiswa-service.js")

const loginMahasiswa = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await mahasiswaService.loginMahasiswa(body);
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        next(e)
    }
}

const logoutMahasiswa = async (req, res, next) => {
    try {
        const user = req.user;
        await mahasiswaService.logoutMahasiswa(user.nim);
        res.json({
            status: 200,
            message: "Successfully Logout"
        })
    } catch (e) {
        next(e)
    }
}

const getMahasiswa = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await mahasiswaService.getMahasiswaCurrent(user.nim)
        res.json({
            status: 200,
            data: result,
            message: "OK"
        })
    } catch (e) {
        next(e)
    }
}

const updateMahasiswa = async (req, res, next) => {
    try {
        const user = req.user;
        const body = req.body;
        const result = await mahasiswaService.updateBiodata(user.nim, body)
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
    loginMahasiswa,
    logoutMahasiswa,
    getMahasiswa,
    updateMahasiswa
}