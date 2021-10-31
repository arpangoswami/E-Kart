import axios from "axios";

export const getAllOrders = async (authToken) =>
  axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authToken,
    },
  });

export const changeOrderStatus = async (orderId, orderStatus, authToken) =>
  axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
