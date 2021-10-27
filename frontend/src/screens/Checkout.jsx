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
import { getUserCart, emptyUserCart, userAddressSave } from "../functions/cart";
import deliveryAddress from "../assets/deliveryAddress.svg";
import RoomIcon from "@material-ui/icons/Room";
import { toast } from "react-toastify";
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
const Checkout = () => {
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const [couponName, setCouponName] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, cart } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        console.log("PRODUCTS: ", res.data.products);
      })
      .catch((err) => toast.error(`${err} happened while fetching cart`));
  }, []);
  const saveAddressToDB = (e) => {
    e.preventDefault();
    userAddressSave(address, user.token)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("New address saved");
        }
      })
      .catch((err) => toast.error(`${err} saving address to the database`));
  };
  const saveOrderToDB = (e) => {
    e.preventDefault();
  };
  const applyCoupon = (e) => {
    e.preventDefault();
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
        <img src={deliveryAddress} className={classes.media} />
      </div>
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
            Save
          </Button>
        </Grid>
      </form>
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
      />
      <Grid container justify="center">
        <Button
          disabled={!couponName}
          className="m-2"
          variant="outlined"
          color="secondary"
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
        </Table>
        <Grid container justify="center">
          <div className="col-md-6">
            <Grid container justify="center">
              <Button
                color="primary"
                disabled={!addressSaved || !products || products.length === 0}
                variant="outlined"
                className="m-4"
              >
                Place Order
              </Button>
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
