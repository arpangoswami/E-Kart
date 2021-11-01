import React from "react";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ShowPaymentInformation from "../cards/ShowPaymentInformation";
import {
  amber,
  red,
  blue,
  green,
  orange,
  lightGreen,
} from "@material-ui/core/colors";
import {
  FormControl,
  Typography,
  MenuItem,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";
const possibleStatus = [
  "Not Processed",
  "Cash On Delivery",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Delivered",
];
function bgColor(orderStatus) {
  const colors = [
    blue[400],
    lightGreen[600],
    amber[400],
    orange[400],
    red[400],
    green[400],
  ];
  for (let i = 0; i < possibleStatus.length; i++) {
    if (possibleStatus[i] === orderStatus) {
      return colors[i];
    }
  }
  return amber[400];
}

const Orders = ({ orders, handleStatusChange }) => {
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

  return (
    <>
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center pt-5 mb-2"
      >
        Admin Dashboard
      </Typography>
      <Divider />
      {orders.map((order, i) => (
        <div className="card m-5 p-3 text-center" key={i}>
          <ShowPaymentInformation order={order} />
          <Grid justify="center">
            <Typography
              variant="body1"
              fontFamily="Quicksand"
              className="text-center"
            >
              Change Order Status:
            </Typography>
            <FormControl className="text-center m-3 col-md-4">
              <TextField
                select
                value={order.orderStatus}
                label="Change order status"
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                variant="outlined"
              >
                {possibleStatus.map((poss, i) => (
                  <MenuItem key={i} value={poss}>
                    {poss}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          {showIndividualOrder(order)}
        </div>
      ))}
    </>
  );
};
export default Orders;
