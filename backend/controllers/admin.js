const Order = require("../models/order");
exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  );
  console.log("UPDATED: ", updated);
  res.json(updated);
};
