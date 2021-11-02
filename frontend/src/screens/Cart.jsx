import React from "react";
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
import { Link } from "react-router-dom";
import { orange, green } from "@material-ui/core/colors";
import { userCart } from "../functions/cart";
import { toast } from "react-toastify";
import ProductRowInCart from "../components/cards/ProductRowInCart";
const Cart = ({ history }) => {
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
  const saveOrderToDB = (e, cod = false) => {
    e.preventDefault();
    if (cod) {
      dispatch({
        type: "CASH_ON_DELIVERY",
        payload: true,
      });
    }
    //console.log("Cart: ", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) =>
        toast.error(`${err} happened while saving cart to database`)
      );
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <Paper>
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
            </Grid>
            {cart.length > 0 && showCart()}
          </Paper>
        </div>
        <div className="col-md-4">
          <TableContainer component={Paper}>
            <Typography
              variant="h5"
              color="primary"
              fontFamily="Quicksand"
              className="text-center mt-5 mb-3"
            >
              Order Summary
            </Typography>
            <hr />
            <Table>
              {cart.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {c.title} x {c.count} ={" "}
                  </TableCell>
                  <TableCell>
                    <strong>₹{c.price * c.count}</strong>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total :-</TableCell>
                <TableCell>
                  <strong>₹{getTotal()}</strong>
                </TableCell>
              </TableRow>
            </Table>

            {user ? (
              <>
                <Grid container justify="center">
                  <Button
                    onClick={(e) => saveOrderToDB(e)}
                    className="btn btn-sm mb-3 mt-3"
                    disabled={cart.length === 0 ? true : false}
                    style={{ color: green[400] }}
                    variant="outlined"
                  >
                    Proceed to Checkout
                  </Button>
                </Grid>
                <Grid container justify="center">
                  <Button
                    onClick={(e) => saveOrderToDB(e, true)}
                    className="btn btn-sm mb-3 mt-3"
                    disabled={cart.length === 0 ? true : false}
                    style={{ color: orange[400] }}
                    variant="outlined"
                  >
                    Cash On Delivery
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid container justify="center">
                <Button
                  className="btn btn-sm text-info mb-3 mt-3"
                  variant="outlined"
                >
                  <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                    Login to Checkout
                  </Link>
                </Button>
              </Grid>
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Cart;
