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
  getAddress,
  createOrder,
  orderByUser,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/user");
router.post("/user/cart", authenticationCheck, userCart);
router.get("/user/cart", authenticationCheck, getUserCart);
router.delete("/user/cart", authenticationCheck, emptyCart);
router.post("/user/address", authenticationCheck, saveAddress);
router.get("/user/address", authenticationCheck, getAddress);
//coupon
router.post("/user/cart/coupon", authenticationCheck, applyToUserCart);
router.post("/user/order", authenticationCheck, createOrder);
router.get("/user/orders", authenticationCheck, orderByUser);
//wishlist
router.post("/user/wishlist", authenticationCheck, addToWishlist);
router.get("/user/wishlist", authenticationCheck, getWishlist);
router.put(
  "/user/wishlist/:productId",
  authenticationCheck,
  removeFromWishlist
);
module.exports = router;
