const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqid = require("uniqid");
exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();
  let cartByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();
  if (cartByThisUser) {
    cartByThisUser.remove();
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let productFromDatabase = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDatabase.price;
    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  //const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({
    products: cart.products,
    cartTotal: cart.cartTotal,
    totalAfterDiscount: cart.totalAfterDiscount,
  });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

exports.applyToUserCart = async (req, res) => {
  const { coupon } = req.body;
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (!validCoupon) {
    return res.json({ err: "Invalid Coupon" });
  }
  const user = await User.findOne({ email: req.user.email }).exec();
  let { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();
  let totalAfterCoupon = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount: totalAfterCoupon },
    { new: true }
  ).exec();
  res.json({ totalAfterCoupon });
};

exports.getAddress = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  if (user.address) {
    return res.json({ ok: true, address: user.address });
  }
  res.json({ ok: false });
};

exports.createOrder = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const { paymentIntent } = req.body.stripeResponse;
  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();
  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({ ok: true });
};

exports.orderByUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let ordersMade = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();
  //console.log("ORDERS: ", ordersMade);
  res.json(ordersMade);
};
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();
  const wishlistUpdated = await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { wishlist: productId } },
    { new: true }
  );
  res.json({ ok: true });
};

exports.getWishlist = async (req, res) => {
  const wishlist = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();
  res.json(wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
    { new: true }
  ).exec();
  res.json({ ok: true });
};

exports.createCashOrder = async (req, res) => {
  const { cashOnDelivery, couponApplied } = req.body;
  if (!cashOnDelivery) {
    return res.status(400).send("Create cash order failed");
  }
  const user = await User.findOne({ email: req.user.email }).exec();
  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();
  let finalAmount = 0;
  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = Math.ceil(userCart.totalAfterDiscount) * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }
  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      amount: finalAmount,
      currency: "inr",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderedBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({ ok: true });
};
