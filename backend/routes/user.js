const express = require("express");
const router = express.Router();

//middlewares
const { authenticationCheck } = require("../middlewares/authentication");

const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyToUserCart,
} = require("../controllers/user");
router.post("/user/cart", authenticationCheck, userCart);
router.get("/user/cart", authenticationCheck, getUserCart);
router.delete("/user/cart", authenticationCheck, emptyCart);
router.post("/user/address", authenticationCheck, saveAddress);
//coupon
router.post("/user/cart/coupon", authenticationCheck, applyToUserCart);
module.exports = router;
