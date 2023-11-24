const express = require("express");
const router = express.Router();
const verifyRoles = require("../Middlewares/verifyRoles");
const orderController = require("../Controllers/orderController");

router.route("/income").get(verifyRoles(), orderController.getOrderStats);
router.route("/").post(orderController.createOrder);
router.route("/").get(verifyRoles(), orderController.getAllOrders);
router
  .route("/:id")
  .put(verifyRoles(), orderController.updateOrder)
  .delete(verifyRoles(), orderController.deleteOrder)
  .get(orderController.getUserOrders);

module.exports = router;
