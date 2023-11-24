const express = require("express");
const router = express.Router();
const verifyRoles = require("../Middlewares/verifyRoles");
const cartController = require("../Controllers/cartController");

router.route("/").get(verifyRoles(), cartController.getAllCarts);
router.route("/").post(cartController.createCart);
router
  .route("/:id")
  .get(cartController.getUserCart)
  .put(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = router;
