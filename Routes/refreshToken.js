const refreshToken = require("../Controllers/refreshTokenController");
const express = require("express");
const router = express.Router();

router.get("/", refreshToken.handleRefreshToken);

module.exports = router;
