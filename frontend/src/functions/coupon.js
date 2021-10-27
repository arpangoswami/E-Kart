import axios from "axios";

export const getAllCoupons = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`, {
    headers: {
      authToken,
    },
  });

export const deleteCoupon = async (couponId, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete/${couponId}`, {
    headers: {
      authToken,
    },
  });

export const createCoupon = async (coupon, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/create/coupon`, coupon, {
    headers: {
      authToken,
    },
  });

export const updateCoupon = async (couponId, coupon, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/coupon/update/${couponId}`,
    coupon,
    {
      headers: {
        authToken,
      },
    }
  );

export const getSingleCoupon = async (couponId, authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authToken,
    },
  });
