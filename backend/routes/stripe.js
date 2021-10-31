const express = require("express");
const router = express.Router();
//middlewares
const { authenticationCheck } = require("../middlewares/authentication");
const { createPaymentIntent } = require("../controllers/stripe");
router.post("/create-payment-intent", authenticationCheck, createPaymentIntent);
module.exports = router;
