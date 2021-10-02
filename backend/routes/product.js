const express = require("express");

const router = express.Router();

//middlewares
const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

//controllers
const {
  createProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/product");

router.post("/create-product", authenticationCheck, isAdmin, createProduct);

router.get("/products/:count", getAllProducts);

router.delete(
  "/delete-product/:slug",
  authenticationCheck,
  isAdmin,
  deleteProduct
);
module.exports = router;
