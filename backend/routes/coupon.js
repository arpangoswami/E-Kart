const express = require("express");
const router = express.Router();

//middlewares
const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

//controllers
const {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
} = require("../controllers/coupon");

router.post("/create/coupon", authenticationCheck, isAdmin, createCoupon);
router.delete("/delete/:couponId", authenticationCheck, isAdmin, deleteCoupon);
router.get("/coupons", authenticationCheck, isAdmin, getAllCoupons);
router.get("/coupon/:couponId", authenticationCheck, isAdmin, getSingleCoupon);
router.put(
  "/coupon/update/:couponId",
  authenticationCheck,
  isAdmin,
  updateCoupon
);
module.exports = router;
