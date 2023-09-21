const Mahasiswa = require("../models/mahasiswa");
const { ResponseError } = require("../utilities/error/ResponseError");
const { nimSchema, loginMahasiswaSchema, updateBiodataSchema } = require("../utilities/validation/mahasiswa-validation")
const bcrypt = require("bcrypt");
const { validate } = require("../utilities/validation/validation");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const loginMahasiswa = async (request) => {
    const loginRequest = validate(loginMahasiswaSchema, request)

    console.log(loginRequest.nim);

    const dataMahasiswa = await Mahasiswa.findOne({
        nim: loginRequest.nim
    })

    if (dataMahasiswa === null) {
        throw new ResponseError(401, "Username or password invalid")
    }

    if (dataMahasiswa.isActive === 0) {
        throw new ResponseError(400, "You cannot to login!")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, dataMahasiswa.password)
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const token = jwt.sign({
        nim: dataMahasiswa.nim,
        isActive: dataMahasiswa.isActive
    }, process.env.SECRET_KEY, {
        algorithm: process.env.JWT_ALGO,
        expiresIn: process.env.JWT_EXPIRED
    })

    await Mahasiswa.updateOne({
        nim: dataMahasiswa.nim
    }, {
        $set: {
            token: token
        }
    }).exec()
    const result = {
        type: "Bearer",
        token: token
    }
    return result;
}

const logoutMahasiswa = async (nim) => {
    nim = validate(nimSchema, nim);
    const dataMahasiswa = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    await dataMahasiswa.updateOne({
        $set: {
            token: null
        }
    }).exec()
}

const getMahasiswaCurrent = async (nim) => {
    nim = validate(nimSchema, nim);

    const dataMahasiswa = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    if (dataMahasiswa === null) {
        throw new ResponseError(404, "Mahasiswa Not Found")
    }

    return dataMahasiswa
}

const updateBiodata = async (nim, request) => {
    nim = validate(nimSchema, nim)
    const requestUpdate = validate(updateBiodataSchema, request);

    const dataMahasiswa = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    if (dataMahasiswa === null) {
        throw new ResponseError(404, "Mahasiswa Not Found")
    }

    let updateMahasiswaCurrent = await Mahasiswa.updateOne({
        nim: nim
    }, {
        $set: {
            "biodata.firstName": requestUpdate.firstName,
            "biodata.middleName": requestUpdate.middleName,
            "biodata.lastName": requestUpdate.lastName,
            "biodata.address": requestUpdate.address,
            "biodata.phoneNumber": requestUpdate.phoneNumber
        }
    })

    updateMahasiswaCurrent = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    return updateMahasiswaCurrent
}

module.exports = {
    loginMahasiswa,
    logoutMahasiswa,
    getMahasiswaCurrent,
    updateBiodata
}