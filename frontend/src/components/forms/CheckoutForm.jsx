import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { Typography } from "@material-ui/core";
import { emptyUserCart } from "../../functions/cart";
import { createOrder } from "../../functions/stripe";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { lightGreen, lightBlue, teal } from "@material-ui/core/colors";
const cartStyle = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [payable, setPayable] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setPayable(res.data.payable);
    });
  }, [user.token, coupon]);

  const handleSubmit = async (e) => {
    //
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setProcessing(false);
      setError(`Payment failed ${payload.error.message}`);
    } else {
      //console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setSuccess(true);
      setProcessing(false);
      createOrder(payload, user.token)
        .then((res) => {
          if (res.data.ok) {
            if (typeof window !== undefined) {
              localStorage.removeItem("cart");
            }
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });
            emptyUserCart(user.token)
              .then((res) => {
                toast.info(
                  "Cart is empty. To continue shopping click on Home icon or Shop in the navbar"
                );
              })
              .catch((err) =>
                toast.error(`${err} happened while emptying cart`)
              );
          }
        })
        .catch((err) =>
          toast.error(`${err} happened while processing the order`)
        );
    }
  };

  const handleChange = async (e) => {
    //
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <>
      <div className="text-center">
        <div className={payable === cartTotal ? "text-info" : "text-success"}>
          {payable === cartTotal ? (
            <div>
              <Typography
                variant="h6"
                className="m-4"
                style={{ color: lightBlue[500] }}
              >
                No coupon applied
              </Typography>
            </div>
          ) : (
            <div>
              <Typography
                variant="h6"
                className="m-4"
                style={{ color: lightGreen[500] }}
              >
                You are saving ₹{cartTotal - payable} after applying the coupon
              </Typography>
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <Typography style={{ color: teal[300] }}>
              Cart Total:- ₹{cartTotal}
            </Typography>
          </div>
          <div className="col-md-6">
            <Typography style={{ color: teal[300] }}>
              Payable:- ₹{payable}
            </Typography>
          </div>
        </div>
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || success}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
      {error && (
        <div className="card-error text-center" role="alert">
          <Typography variant="h6" className="m-2 text-danger">
            {error}
          </Typography>
        </div>
      )}
      <p
        className={
          success ? "result-message text-center" : "result-message hidden"
        }
      >
        <Typography variant="h6" className="m-2 text-success">
          Transaction successful.{" "}
          <Link to="/user/history">
            Please visit here to see status of your purchases.
          </Link>
        </Typography>
      </p>
    </>
  );
};

export default CheckoutForm;
