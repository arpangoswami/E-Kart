import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  SwipeableDrawer,
  Typography,
  //IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultLaptop from "../../assets/defaultLaptop.jpg";
//import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
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
export default function WishlistSideDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { wishlist, wishlistDrawer } = useSelector((state) => ({ ...state }));
  const handleDrawerToggle = () => {
    dispatch({
      type: "SET_VISIBLE_WISHLIST",
      payload: false,
    });
  };
  const history = useHistory();
  // const removeProduct = (e, product) => {
  //   e.preventDefault();
  //   let wishlist = [];

  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem("wishlist")) {
  //       wishlist = JSON.parse(localStorage.getItem("wishlist"));
  //     }

  //     wishlist.map(
  //       (prod, i) => prod._id === product._id && wishlist.splice(i, 1)
  //     );

  //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
  //     dispatch({
  //       type: "ADD_TO_WISHLIST",
  //       payload: wishlist,
  //     });
  //   }
  // };
  const redirectToWishlist = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_VISIBLE_WISHLIST",
      payload: false,
    });
    history.push("/wishlist");
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
  const wishlistSideDrawer = (
    <>
      <Divider />
      <Typography
        variant="h5"
        align="center"
        className={classes.title}
        color="primary"
      >
        Wishlist | {wishlist.length} items
      </Typography>
      <Divider />
      {wishlist.map((p) => (
        <div key={p._id}>
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
            {/* <IconButton
              className="text-danger"
              onClick={(e) => removeProduct(e, p)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton> */}
          </div>
        </div>
      ))}
      <Button
        onClick={redirectToWishlist}
        variant="contained"
        className="text-center btn btn-primary btn-raised btn-block bg-success"
      >
        Go to Wishlist
      </Button>
    </>
  );
  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="right"
      open={wishlistDrawer}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {wishlistSideDrawer}
    </SwipeableDrawer>
  );
}
