const express = require('express');
const adminAPI = require("./admin")
const router = express.Router();
router.use(adminAPI())

module.exports = () => router