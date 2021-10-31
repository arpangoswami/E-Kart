import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultLaptop from "../../assets/defaultLaptop.jpg";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
const useStyles = makeStyles((theme) => ({
  mediaClass: {
    width: "100%",
    padding: theme.spacing(2),
  },
}));
const imageStyle = {
  justifyContent: "center",
  display: "flex",
  height: 140,
  objectFit: "contain",
  cursor: "auto",
};
export default function ProductRowInCart({ product }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const removeProduct = (e) => {
    e.preventDefault();
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // cart.map((prod, i) => {
      //   if (prod._id === product._id) {
      //     cart.splice(i, 1);
      //   }
      // });
      cart.map((prod, i) => prod._id === product._id && cart.splice(i, 1));

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > product.quantity) {
      toast.error(`Max available quantity: ${product.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart[i].count = count;
        }
        return cart[i];
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <TableRow>
      <TableCell>
        {product.images && product.images.length > 0 ? (
          <div style={imageStyle}>
            <ModalImage
              style={imageStyle}
              className={classes.mediaClass}
              small={product.images[0].url}
              large={product.images[0].url}
              alt={product.title}
            />
          </div>
        ) : (
          <div style={imageStyle}>
            <ModalImage
              className={classes.mediaClass}
              small={defaultLaptop}
              large={defaultLaptop}
              alt="default image"
            />
          </div>
        )}
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>
        <strong>₹{product.price}</strong>
      </TableCell>
      <TableCell>
        <strong>{product.brand}</strong>
      </TableCell>
      <TableCell>
        <strong>{product.color}</strong>
      </TableCell>
      <TableCell>
        <strong>
          <input
            type="number"
            className="form-control"
            value={product.count}
            onChange={handleQuantityChange}
          />
        </strong>
      </TableCell>
      <TableCell>
        {product.shipping === "Yes" ? (
          <CheckCircleOutlinedIcon className="text-success" />
        ) : (
          <CancelOutlinedIcon className="text-danger text-center" />
        )}
      </TableCell>
      <TableCell>
        <IconButton className="text-danger text-center" onClick={removeProduct}>
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
