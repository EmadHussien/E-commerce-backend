const logoutController = require("../Controllers/logoutController");
const express = require("express");
const router = express.Router();

router.post("/", logoutController.handleLogout);

module.exports = router;
