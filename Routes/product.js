const express = require("express");
const router = express.Router();
const verifyRoles = require("../Middlewares/verifyRoles");
const verifyJWT = require("../Middlewares/verifyJWT");
const productController = require("../Controllers/productController");

router.route("/").post(verifyRoles(), productController.createProduct);
/* router
.route("/")
.get(verifyJWT, verifyRoles(), productController.getAllProducts);
*/
router.route("/").get(productController.getAllProducts);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .put(verifyRoles(), productController.updateProduct)
  .delete(verifyRoles(), productController.deleteProduct);

module.exports = router;
