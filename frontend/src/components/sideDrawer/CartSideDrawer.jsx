import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  SwipeableDrawer,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultLaptop from "../../assets/defaultLaptop.jpg";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ModalImage from "react-modal-image";
const drawerWidth = 360;
const useStyles = makeStyles((theme) => ({
  mediaClass: {
    width: "100%",
    padding: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
const imageStyle = {
  justifyContent: "center",
  display: "flex",
  height: 100,
  objectFit: "contain",
  cursor: "auto",
};
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}
export default function CartSideDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  const handleDrawerToggle = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };
  const history = useHistory();
  const removeProduct = (e, product) => {
    e.preventDefault();
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((prod, i) => prod._id === product._id && cart.splice(i, 1));

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const redirectToCart = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
    history.push("/cart");
  };
  const showImage = (product) => {
    return (
      <>
        {product.images && product.images.length > 0 ? (
          <div style={imageStyle}>
            <ModalImage
              style={{}}
              className={classes.mediaClass}
              small={product.images[0].url}
              large={product.images[0].url}
              alt={product.title}
            />
          </div>
        ) : (
          <div style={imageStyle}>
            <ModalImage
              style={{}}
              className={classes.mediaClass}
              small={defaultLaptop}
              large={defaultLaptop}
              alt={product.title}
            />
          </div>
        )}
      </>
    );
  };
  const cartDrawer = (
    <>
      <Divider />
      <Typography
        variant="h5"
        align="center"
        className={classes.title}
        color="primary"
      >
        Cart | {cart.length} items
      </Typography>
      <Divider />
      {cart.map((p, i) => (
        <div key={i}>
          <Typography variant="body1" align="center" className="text-center">
            {truncate(p.title, 60)} X {p.count}
          </Typography>
          <br />
          {showImage(p)}
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <IconButton
              className="text-danger"
              onClick={(e) => removeProduct(e, p)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
        </div>
      ))}
      <Button
        onClick={redirectToCart}
        variant="contained"
        className="text-center btn btn-primary btn-raised btn-block bg-success"
      >
        Go to Cart
      </Button>
    </>
  );
  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="right"
      open={drawer}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {cartDrawer}
    </SwipeableDrawer>
  );
}
