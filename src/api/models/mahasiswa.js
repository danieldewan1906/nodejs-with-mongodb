const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BiodataSchema = new Schema({
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    }
})

const MahasiswaSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    isActive: {
        type: Number,
        required: true,
        default: 1
    },
    biodata: BiodataSchema
}, {
    versionKey: false
})

const Mahasiswa = mongoose.model("mahasiswa", MahasiswaSchema)
module.exports = Mahasiswa