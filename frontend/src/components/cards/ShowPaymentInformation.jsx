import React from "react";
import { red, green } from "@material-ui/core/colors";
const ShowPaymentInformation = ({ order, showStatus = true, cod = false }) => (
  <div>
    <p>
      <span className="m-1">Order Id: {order.paymentIntent.id}</span>
      {" | "}
      <span className="m-1">
        Amount:
        {(order.paymentIntent.amount /= 100).toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </span>
      {" | "}
      <span className="m-1">
        Currency: {order.paymentIntent.currency.toUpperCase()}
      </span>
      {" | "}
      <span className="m-1">
        Method: {order.paymentIntent.payment_method_types[0]}
      </span>
      {" | "}
      {showStatus && (
        <span className="m-1">
          Payment:{" "}
          <span
            style={{
              backgroundColor:
                order.paymentIntent.status.toUpperCase() === "SUCCEEDED"
                  ? green[500]
                  : red[400],
            }}
            className="badge text-white"
          >
            {order.paymentIntent.status.toUpperCase()}
          </span>
        </span>
      )}
      {" | "}
      <span className="m-1">
        Ordered on:
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
    </p>
  </div>
);

export default ShowPaymentInformation;
