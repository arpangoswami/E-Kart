const Coupon = require("../models/coupon");

exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    // console.log("YOYLYOYOYO");
    // console.log("NAME: ", name);
    // console.log("EXPIRY: ", expiry);
    // console.log("DISCOUNT: ", discount);
    // console.log(req.body);
    const newCoupon = await new Coupon({ name, expiry, discount }).save();
    res.json(newCoupon);
  } catch (err) {
    res.status(400).send("Coupon creation failed");
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    res.status(400).json({ err: "Coupon creation failed" });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    res.status(400).send("All coupons fetch failed");
  }
};

exports.getSingleCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findById(req.params.couponId).exec());
  } catch (err) {
    res.status(400).send("Unable to fetch failed");
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    res.json(
      await Coupon.findOneAndUpdate(
        { _id: req.params.couponId },
        { name, expiry, discount },
        { new: true }
      )
    );
  } catch (err) {
    res.status(400).send("Coupon updation failed");
  }
};
