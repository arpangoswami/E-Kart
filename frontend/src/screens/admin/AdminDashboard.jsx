import React, { useState, useEffect, useCallback } from "react";
import { getAllOrders, changeOrderStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import Orders from "../../components/order/Orders";
import { toast } from "react-toastify";
const AdminDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const loadAllOrders = useCallback(() => {
    getAllOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((err) => toast.error(`${err} happened while fetching orders`));
  }, [user.token]);
  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);
  const handleStatusChange = (orderId, orderStatus) => {
    changeOrderStatus(orderId, orderStatus, user.token)
      .then((res) => {
        toast.success("Order Updated");
        loadAllOrders();
      })
      .catch((err) =>
        toast.error(`${err} happened while changing order status`)
      );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
