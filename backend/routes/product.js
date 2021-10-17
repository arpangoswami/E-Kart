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
  readProduct,
  updateProduct,
  listCountProductsSort,
  getTotalCount,
  productStar,
} = require("../controllers/product");

router.post("/create-product", authenticationCheck, isAdmin, createProduct);
router.get("/products/total-count", getTotalCount);
router.get("/products/:count", getAllProducts);

router.delete(
  "/delete-product/:slug",
  authenticationCheck,
  isAdmin,
  deleteProduct
);

router.get("/product/:slug", readProduct);

router.put(
  "/product/update/:slug",
  authenticationCheck,
  isAdmin,
  updateProduct
);

router.post("/products/sort", listCountProductsSort);

//ratings
router.put("/product/add-rating/:productId", authenticationCheck, productStar);
module.exports = router;
