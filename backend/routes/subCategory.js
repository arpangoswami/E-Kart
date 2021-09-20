const express = require("express");

const router = express.Router();

const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

const {
  createSubCategory,
  readSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
} = require("../controllers/subCategory.js");

router.post(
  "/create-sub-category",
  authenticationCheck,
  isAdmin,
  createSubCategory
);

router.get("/sub-categories", getAllSubCategories);

router.get("/sub-category/:slug", readSubCategory);

router.put(
  "/sub-category/update/:slug",
  authenticationCheck,
  isAdmin,
  updateSubCategory
);

router.delete(
  "/sub-category/delete/:slug",
  authenticationCheck,
  isAdmin,
  deleteSubCategory
);

module.exports = router;
