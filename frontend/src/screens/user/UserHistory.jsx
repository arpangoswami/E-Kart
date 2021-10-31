import React, { useState, useEffect, useCallback } from "react";
import { Typography, Divider } from "@material-ui/core";
import { getUserOrders } from "../../functions/cart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ShowPaymentInformation from "../../components/cards/ShowPaymentInformation";
import { amber, red, blue, green, orange } from "@material-ui/core/colors";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
const possibleStatus = [
  "Not Processed",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Delivered",
];
function bgColor(orderStatus) {
  const colors = [blue[400], amber[400], orange[400], red[400], green[400]];
  for (let i = 0; i < possibleStatus.length; i++) {
    if (possibleStatus[i] === orderStatus) {
      return colors[i];
    }
  }
  return amber[400];
}
const showDownloadLink = (order) => (
  <PDFDownloadLink
    document={<Invoice order={order} />}
    fileName="invoice.pdf"
    className="btn btn-sm btn-block btn-outline-primary"
  >
    Download PDF Invoice
  </PDFDownloadLink>
);
const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const loadUserOrders = useCallback(() => {
    getUserOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error(`${err} happened while fetching user orders`);
      });
  }, [user.token]);
  useEffect(() => {
    loadUserOrders();
  }, [loadUserOrders]);
  const showIndividualOrder = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th className="col" style={{ width: "35%" }}>
            Title
          </th>
          <th className="col" style={{ width: "10%" }}>
            Brand
          </th>
          <th className="col" style={{ width: "10%" }}>
            Price
          </th>
          <th className="col" style={{ width: "10%" }}>
            Color
          </th>
          <th className="col" style={{ width: "10%" }}>
            Count
          </th>
          <th className="col" style={{ width: "10%" }}>
            Shipping
          </th>
          <th className="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <strong>{p.product.title}</strong>
            </td>
            <td>{p.product.brand}</td>
            <td>₹{p.product.price}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlinedIcon className="text-success" />
              ) : (
                <CancelOutlinedIcon className="text-danger" />
              )}
            </td>
            <td>
              <Typography
                style={{ backgroundColor: bgColor(order.orderStatus) }}
                className="text-white badge"
              >
                {order.orderStatus}
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const showOrders = () =>
    orders.map((order, i) => (
      <div className="card m-5 p-3 text-center" key={i}>
        <ShowPaymentInformation order={order} />
        {showIndividualOrder(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center pt-5 mb-2"
      >
        {orders && orders.length > 0
          ? "Your previous purchases"
          : "No previous purchases"}
      </Typography>
      <Divider />
      {showOrders()}
    </div>
  );
};
export default UserHistory;
