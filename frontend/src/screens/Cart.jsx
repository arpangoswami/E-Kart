import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import ProductRowInCart from "../components/cards/ProductRowInCart";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const showCart = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "35%" }}>Image</TableCell>
              <TableCell style={{ width: "25%" }}>Title</TableCell>
              <TableCell style={{ width: "6%" }}>Price</TableCell>
              <TableCell style={{ width: "6%" }}>Brand</TableCell>
              <TableCell style={{ width: "10%" }}>Color</TableCell>
              <TableCell style={{ width: "12%" }}>Count</TableCell>
              <TableCell style={{ width: "5%" }}>Shipping</TableCell>
              <TableCell style={{ width: "5%" }}>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((p) => (
              <ProductRowInCart key={p._id} product={p} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDB = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <Grid container justify="center">
            <Typography
              variant="h4"
              color="primary"
              fontFamily="Quicksand"
              className="text-center pt-2"
            >
              {cart.length > 0 ? (
                <Typography
                  variant="h4"
                  color="primary"
                  fontFamily="Quicksand"
                  className="text-center pt-2"
                >
                  Cart | {cart.length} products
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    color="primary"
                    fontFamily="Quicksand"
                    className="text-center pt-2"
                  >
                    No Products in cart
                  </Typography>
                  <br />
                  <h5>
                    <Link to="/shop" className="pt-1">
                      Continue Shopping
                    </Link>
                  </h5>
                </>
              )}
              <hr />
            </Typography>
            {cart.length > 0 && showCart()}
          </Grid>
        </div>
        <div className="col-md-4">
          <Grid container justify="center">
            <TableContainer component={Paper}>
              <Table>
                <Typography
                  variant="h5"
                  color="primary"
                  fontFamily="Quicksand"
                  className="text-center pt-5 pb-3"
                >
                  Order Summary
                </Typography>
                <hr />
                {cart.map((c, i) => (
                  <div className="p-2">
                    <TableRow key={i}>
                      <p>
                        {c.title} x {c.count} ={" "}
                        <strong>₹{c.price * c.count}</strong>
                      </p>
                    </TableRow>
                    <hr />
                  </div>
                ))}
                <Grid container justify="center">
                  Total :- <strong>₹{getTotal()}</strong>
                </Grid>
                <Grid container justify="center">
                  {user ? (
                    <Button
                      onClick={saveOrderToDB}
                      className="btn btn-sm mb-3 mt-3"
                      disabled={cart.length === 0 ? true : false}
                      color="secondary"
                    >
                      Proceed to Checkout
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-sm text-info mb-3 mt-3"
                      color="primary"
                    >
                      <Link
                        to={{ pathname: "/login", state: { from: "/cart" } }}
                      >
                        Login to Checkout
                      </Link>
                    </Button>
                  )}
                </Grid>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Cart;
