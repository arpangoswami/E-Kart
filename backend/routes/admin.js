const express = require("express");

const router = express.Router();

//middlewares
const {
  authenticationCheck,
  isAdmin,
} = require("../middlewares/authentication");

const { orders, orderStatus } = require("../controllers/admin");

router.get("/admin/orders", authenticationCheck, isAdmin, orders);
router.put("/admin/order-status", authenticationCheck, isAdmin, orderStatus);
module.exports = router;
