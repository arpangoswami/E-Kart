import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  TableContainer,
  Paper,
  Table,
  Typography,
  TableRow,
  TableCell,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  userAddressSave,
  applyCoupon,
  getUserAddress,
  createCashOrder,
} from "../functions/cart";
import deliveryAddress from "../assets/deliveryAddress.svg";
import RoomIcon from "@material-ui/icons/Room";
import { toast } from "react-toastify";
import { yellow } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  paperClass: {
    maxWidth: 800,
    maxHeight: 1600,
    [theme.breakpoints.down("md")]: {
      maxWidth: 450,
      maxheight: 1800,
    },
    alignContent: "center",
    margin: "auto",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
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
  field: {
    margin: 20,
    display: "block",
  },
  writeField: {
    alignContent: "center",
    margin: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  attrField: {
    width: "96%",
    margin: theme.spacing(2),
  },
  attrField2: {
    width: "94%",
    margin: theme.spacing(2),
  },
  paperClass2: {
    width: "100%",
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));
const imageStyle = {
  justifyContent: "center",
  display: "flex",
};
const Checkout = ({ history }) => {
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState(false);
  const [discErr, setDiscErr] = useState("");
  const [addressAvailable, setAddressAvailable] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, cashOnDelivery, coupon } = useSelector((state) => ({
    ...state,
  }));
  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.cartTotal);
        //console.log("PRODUCTS: ", res.data.products);
      })
      .catch((err) => toast.error(`${err} happened while fetching cart`));
    getUserAddress(user.token)
      .then((res) => {
        if (res.data.ok) {
          setAddress(res.data.address);
          setAddressAvailable(true);
        }
      })
      .catch((err) => console.log(err));
  }, [user.token]);
  const saveAddressToDB = (e) => {
    e.preventDefault();
    userAddressSave(address, user.token)
      .then((res) => {
        if (res.data.ok) {
          toast.success("New address saved");
          setAddressAvailable(true);
        }
      })
      .catch((err) => toast.error(`${err} saving address to the database`));
  };
  const updateAddressHandler = (e) => {
    e.preventDefault();
    setAddressAvailable(false);
    setAddress("");
  };
  const applyCouponBtn = (e) => {
    e.preventDefault();
    applyCoupon({ coupon: couponName }, user.token)
      .then((res) => {
        if (res.data.totalAfterCoupon) {
          setDiscountError(false);
          toast.success("Coupon successfully applied");
          setDiscErr("");
          setTotalAfterDiscount(res.data.totalAfterCoupon);
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        } else if (res.data.err) {
          setDiscountError(true);
          setDiscErr(res.data.err);
          toast.error(res.data.err);
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        }
      })
      .catch((err) => {
        toast.error(err);
        setDiscountError(true);
      });
  };
  const emptyCartBtn = (e) => {
    e.preventDefault();
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    emptyUserCart(user.token)
      .then((res) => {
        setProducts([]);
        setTotal(0);
        toast.info(
          "Cart is empty. To continue shopping click on Home icon or Shop in the navbar"
        );
      })
      .catch((err) => toast.error(`${err} happened while emptying cart`));
    history.push("/user/history");
  };
  const oldAddress = () => {
    if (addressAvailable) {
      return (
        <div className="text-center">
          <Typography variant="h6" className="p-1" color="primary">
            Address given:-{" "}
          </Typography>
          <br />
          <Typography variant="body1">{address}</Typography>
          <Grid justify="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={updateAddressHandler}
              className="m-3"
            >
              Change Address?
            </Button>
          </Grid>
        </div>
      );
    }
    return <></>;
  };
  const createCashOrderFunc = (e) => {
    e.preventDefault();
    createCashOrder(user.token, cashOnDelivery, coupon)
      .then((res) => {
        if (res.data.ok) {
          toast.success(
            "Order successfully placed. Go to user history page to confirm status"
          );
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          dispatch({
            type: "CASH_ON_DELIVERY",
            payload: false,
          });
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          emptyUserCart(user.token)
            .then((res) => {
              toast.info(
                "Cart is empty. To continue shopping click on Home icon or Shop in the navbar"
              );
            })
            .catch((err) => toast.error(`${err} happened while emptying cart`));
          setTimeout(() => {
            history.push("/user/history");
          }, 1000);
        }
      })
      .catch((err) => console.log(`${err} happened while creating cash order`));
  };
  const showAddressField = (
    <Paper className={classes.paperClass}>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        gutterBottom
        className="p-3"
      >
        Delivery Address
      </Typography>
      <Divider />

      <div style={imageStyle}>
        <img
          src={deliveryAddress}
          className={classes.media}
          alt={deliveryAddress}
        />
      </div>
      {oldAddress()}
      {!addressAvailable && (
        <form onSubmit={saveAddressToDB}>
          <TextField
            name="description"
            onChange={(e) => setAddress(e.target.value)}
            className={classes.attrField}
            label="Enter address"
            helperText="Enter your address for the deilvery..."
            variant="outlined"
            required
            fullWidth
            multiline
            value={address}
            rows={4}
          />
          <Grid container justify="center">
            <Button
              type="submit"
              onClick={saveAddressToDB}
              color="secondary"
              variant="outlined"
              disabled={!address}
              className="m-3"
              endIcon={<RoomIcon />}
            >
              Update your address
            </Button>
          </Grid>
        </form>
      )}
    </Paper>
  );
  const showCouponField = (
    <Paper className={classes.paperClass2}>
      <Typography
        variant="h5"
        color="primary"
        fontFamily="Quicksand"
        className="text-center mt-5 mb-3"
      >
        Have a coupon?
      </Typography>
      {discErr && (
        <p className="bg-danger p-2">
          <Typography
            variant="body2"
            style={{ color: yellow[100] }}
            fontFamily="Quicksand"
            className="text-center"
          >
            {discErr}
          </Typography>
        </p>
      )}
      <TextField
        name="Coupon"
        placeholder="Eg:- ARPA100"
        label="Apply coupon"
        onChange={(event) => setCouponName(event.target.value)}
        value={couponName}
        variant="outlined"
        helperText="At least 2 characters"
        required
        className={classes.attrField2}
        error={discountError}
      />
      <Grid container justify="center">
        <Button
          disabled={!couponName}
          className="m-2"
          variant="outlined"
          color="secondary"
          onClick={applyCouponBtn}
        >
          Apply
        </Button>
      </Grid>
    </Paper>
  );

  const showOrderSummary = (
    <Grid container justify="center">
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
          {products.map((p, i) => (
            <TableRow key={i}>
              <TableCell>
                {p.product.title} ({p.color})x {p.count} ={" "}
              </TableCell>
              <TableCell>
                <strong>₹{p.price * p.count}</strong>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total :-</TableCell>
            <TableCell>
              <strong>₹{total}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-success">Total After coupon:-</TableCell>
            <TableCell>
              <strong>₹{Math.ceil(totalAfterDiscount)}</strong>
            </TableCell>
          </TableRow>
        </Table>
        <Grid container justify="center">
          <div className="col-md-6">
            <Grid container justify="center">
              {cashOnDelivery ? (
                <Button
                  color="primary"
                  disabled={
                    !addressAvailable || !products || products.length === 0
                  }
                  variant="outlined"
                  className="m-4"
                  onClick={createCashOrderFunc}
                >
                  Place Order(COD)
                </Button>
              ) : (
                <Button
                  color="primary"
                  disabled={
                    !addressAvailable || !products || products.length === 0
                  }
                  variant="outlined"
                  className="m-4"
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </Button>
              )}
            </Grid>
          </div>
          <div className="col-md-6">
            <Grid container justify="center">
              <Button
                color="secondary"
                className="m-4"
                variant="outlined"
                onClick={emptyCartBtn}
                disabled={!products || products.length === 0}
              >
                Empty Cart
              </Button>
            </Grid>
          </div>
        </Grid>
      </TableContainer>
    </Grid>
  );
  return (
    <div className="row">
      <div className="col-md-8">{showAddressField}</div>
      <div className="col-md-4">
        {showCouponField}
        {showOrderSummary}
      </div>
    </div>
  );
};

export default Checkout;
