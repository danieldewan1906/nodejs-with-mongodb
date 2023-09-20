const express = require('express');
const api = require("./admin/admin")
const router = express.Router();
router.use("/api", api())

module.exports = () => router