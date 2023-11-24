const express = require("express");
const router = express.Router();
const verifyRoles = require("../Middlewares/verifyRoles");
const userController = require("../Controllers/userController");

router.route("/stats").get(verifyRoles(), userController.getUserStats);
router.route("/").get(verifyRoles(), userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
