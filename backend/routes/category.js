const express = require("express");

const router = express.Router();

//middlewares
const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

//controllers
const {
  createCategory,
  readCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

router.post("/create-category", authenticationCheck, isAdmin, createCategory);

router.get("/categories", getAllCategories);

router.get("/category/:slug", readCategory);

router.put(
  "/category/update/:slug",
  authenticationCheck,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/delete/:slug",
  authenticationCheck,
  isAdmin,
  deleteCategory
);

module.exports = router;
