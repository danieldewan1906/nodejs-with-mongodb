const Admin = require("../models/admin");
const Mahasiswa = require("../models/mahasiswa")
const { loginAdminSchema, createNewMahasiswa } = require("../utilities/validation/admin-validation");
const { validate } = require("../utilities/validation/validation");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { ResponseError } = require("../utilities/error/ResponseError");
const Counters = require("../models/counters");
dotenv.config()

const getAllAdmin = async () => {
    const data = await Admin.find({}).select("username password")
    return data
}

const loginAdmin = async (request) => {
    const requestLogin = validate(loginAdminSchema, request);

    const checkAdmin = await Admin.findOne({
        username: requestLogin.username
    }).select("username password token")

    if (!checkAdmin) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const isPasswordValid = await bcrypt.compare(requestLogin.password, checkAdmin.password)
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password invalid")
    }

    const token = jwt.sign({
        username: checkAdmin.username
    }, process.env.SECRET_KEY, {
        algorithm: process.env.JWT_ALGO,
        expiresIn: process.env.JWT_EXPIRED
    })

    await Admin.updateOne({
        username: checkAdmin.username
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

const logoutAdmin = async (username) => {
    const admin = await Admin.findOne({
        username: username
    })

    if (!admin) {
        throw new ResponseError(404, "Not Found")
    }

    await Admin.updateOne({
        username: admin.username
    }, {
        $set: {
            token: null
        }
    }).exec()
}

const createMahasiswa = async (request) => {
    const newRequestMahasiswa = validate(createNewMahasiswa, request)

    const checkMahasiswa = await Mahasiswa.findOne({
        nim: newRequestMahasiswa.nim
    })

    if (checkMahasiswa !== null) {
        throw new ResponseError(400, "Mahasiswa already exists");
    }

    newRequestMahasiswa.password = await bcrypt.hash(newRequestMahasiswa.password, 10);
    const mahasiswaCreate = new Mahasiswa({
        _id: await getNextSequenceNumber("idMahasiswa"),
        nim: newRequestMahasiswa.nim,
        password: newRequestMahasiswa.password,
        biodata: {
            firstName: newRequestMahasiswa.firstName,
            middleName: newRequestMahasiswa.middleName,
            lastName: newRequestMahasiswa.lastName,
            address: newRequestMahasiswa.address,
            phoneNumber: newRequestMahasiswa.phoneNumber
        }
    })
    await mahasiswaCreate.save()
    const resultResponse = {
        nim: mahasiswaCreate.nim,
        isActive: mahasiswaCreate.isActive === 1 ? "Active" : "Inactive",
        biodata: {
            firstName: mahasiswaCreate.biodata.firstName,
            middleName: mahasiswaCreate.biodata.middleName,
            lastName: mahasiswaCreate.biodata.lastName,
            address: mahasiswaCreate.biodata.address,
            phoneNumber: mahasiswaCreate.biodata.phoneNumber
        }
    }
    return resultResponse
}

const getAllMahasiswa = async () => {
    let data = await Mahasiswa.find({}, null, {
        sort: {
            nim: 1
        }
    }).select("nim isActive biodata")
    return data
}

const updateInactiveMahasiswa = async(nim) => {
    const data = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    if (data === null) {
        throw new ResponseError(404, "Mahasiswa Not Found")
    }

    if (data.isActive === 0) {
        throw new ResponseError(400, "Mahasiswa Sudah Tidak Aktif")
    }

    let updateAndShowMahasiswa = await Mahasiswa.updateOne({
        nim: nim
    }, {
        $set: {
            isActive: 0
        }
    })

    updateAndShowMahasiswa = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")
    return updateAndShowMahasiswa
}

const updateActiveMahasiswa = async(nim) => {
    const data = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")

    if (data === null) {
        throw new ResponseError(404, "Mahasiswa Not Found")
    }

    if (data.isActive === 1) {
        throw new ResponseError(400, "Mahasiswa Masih Aktif")
    }

    let updateAndShowMahasiswa = await Mahasiswa.updateOne({
        nim: nim
    }, {
        $set: {
            isActive: 1
        }
    })

    updateAndShowMahasiswa = await Mahasiswa.findOne({
        nim: nim
    }).select("nim isActive biodata")
    return updateAndShowMahasiswa
}

const getMahasiswaByFilter = async (query) => {
    if (query.nim === "" && query.firstName === "" && 
    query.middleName === "" && query.lastName === "") {
        return await Mahasiswa.find({
            isActive: 1
        }).sort({
            nim: 1
        }).select("nim isActive biodata");
    }

    const filterData = await Mahasiswa.find({
        $or: [
            {
                "nim": {
                    $eq: query.nim === "" ? null : query.nim
                }
            },
            {
                "biodata.firstName": {
                    $eq: query.firstName === "" ? null : query.firstName
                }
            },
            {
                "biodata.middleName": {
                    $eq: query.middleName === "" ? null : query.middleName
                }
            },
            {
                "biodata.lastName": {
                    $eq: query.lastName === "" ? null : query.lastName
                }
            }
        ],
        isActive: 1
    }, {
        sort: {
            "nim": 1
        }
    }).collation({
        locale: "en",
        strength: 2
    }).sort({
        nim: 1
    }).select("nim isActive biodata")

    return filterData
}

const getNextSequenceNumber = async (sequenceName) => {
    let dataCounter = await Counters.findOneAndUpdate({
        _id: sequenceName
    }, {
        $inc: {
            sequenceValue: 1
        }
    })

    dataCounter = await Counters.findOne({
        _id: sequenceName
    })
    return dataCounter.sequenceValue
}

module.exports = {
    getAllAdmin,
    loginAdmin,
    logoutAdmin,
    createMahasiswa,
    getAllMahasiswa,
    updateInactiveMahasiswa,
    updateActiveMahasiswa,
    getMahasiswaByFilter
}