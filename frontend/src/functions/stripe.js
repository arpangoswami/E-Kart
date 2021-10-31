import axios from "axios";

export const createPaymentIntent = async (authToken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authToken,
      },
    }
  );

export const createOrder = async (stripeResponse, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );
