const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.createPaymentIntent = async (req, res) => {
  //Step1:- Find user
  const user = await User.findOne({ email: req.user.email }).exec();
  //Step2:- Get user cart total
  const orderDetails = await Cart.findOne({ orderedBy: user._id }).exec();
  let cartTotal = 0;
  let totalAfterDiscount = 0;
  if (orderDetails) {
    cartTotal = orderDetails.cartTotal;
    totalAfterDiscount = orderDetails.totalAfterDiscount;
  }
  let finalAmount = 0;
  if (req.body.couponApplied && totalAfterDiscount) {
    finalAmount = Math.ceil(totalAfterDiscount) * 100;
  } else {
    finalAmount = Math.ceil(cartTotal) * 100;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    //TODO: hard coded here will change later on
    amount: finalAmount,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount / 100,
  });
};
