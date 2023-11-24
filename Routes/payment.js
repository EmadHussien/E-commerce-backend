const express = require("express");
const router = express.Router();
const paymentConrtoller = require("../Controllers/paymentConrtoller");

router.post("/payment", paymentConrtoller.pay);

module.exports = router;
