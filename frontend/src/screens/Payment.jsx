import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import "../stripe.css";
import payment from "../assets/payment.svg";
import CheckoutForm from "../components/forms/CheckoutForm";
const useStyles = makeStyles((theme) => ({
  paperClass: {
    maxWidth: 800,
    maxHeight: 1600,
    [theme.breakpoints.down("md")]: {
      maxWidth: 450,
      maxheight: 1800,
    },
    alignContent: "center",
    marginTop: theme.spacing(4),
    margin: "auto",
    flexDirection: "column",
    padding: theme.spacing(4),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  media: {
    width: 280,
    height: 280,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
      marginLeft: 40,
    },
    alignContent: "center",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));
const imageStyle = {
  justifyContent: "center",
  display: "flex",
};
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const Payment = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paperClass}>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          gutterBottom
          className={classes.headerField}
        >
          Complete Checkout
        </Typography>
        <Divider />
        <div style={imageStyle} className="p-3">
          <img src={payment} className={classes.media} alt={payment} />
        </div>
        <Grid container justify="center"></Grid>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Paper>
    </>
  );
};

export default Payment;
