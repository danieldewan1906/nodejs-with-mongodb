const express = require('express');
const admin = require("./admin/admin")
const router = express.Router();
router.use(router())

module.exports = () => admin