const express = require('express');
const admin = require("./admin")
const mahasiswa = require("./mahasiswa")
const router = express.Router();
router.use(admin())
router.use(mahasiswa())

module.exports = () => router