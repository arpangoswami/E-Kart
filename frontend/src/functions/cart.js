import axios from "axios";
export const userCart = async (cart, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );

export const getUserCart = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const emptyUserCart = async (authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const userAddressSave = async (address, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );

export const applyCoupon = async (coupon, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`, coupon, {
    headers: {
      authToken,
    },
  });

export const getUserAddress = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/address`, {
    headers: {
      authToken,
    },
  });

export const getUserOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authToken,
    },
  });

export const getWishlist = async (authToken) =>
  axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authToken,
    },
  });

export const addToWishlist = async (productId, authToken) =>
  axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );

export const removeFromWishlist = async (productId, authToken) =>
  axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
