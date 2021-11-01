import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  red,
  purple,
  teal,
  lightGreen,
  lime,
  amber,
} from "@material-ui/core/colors";
import defaultLaptop from "../../assets/defaultLaptop.jpg";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating.js";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { removeFromWishlist, addToWishlist } from "../../functions/cart.js";
import { toast } from "react-toastify";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}
const useStyles = makeStyles((theme) => ({
  cardClass: {
    width: 300,
    height: 560,
    alignContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  mediaClass: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  favButtonIcon: {
    backgroundColor: "#FBF3E4",
  },
}));
const ProductCard = ({ product, showWishlistBtn = true }) => {
  const classes = useStyles();
  const { title, description, images, slug } = product;
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const { cart, user, wishlist } = useSelector((state) => ({ ...state }));
  const [tooltipText, setTooltipText] = useState("Add to Cart");
  const presentInWishlistLocal = useCallback(() => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i]._id === product._id) {
        setFav(true);
        return true;
      }
    }
    return false;
  }, [product._id, wishlist]);
  useEffect(() => {
    presentInWishlistLocal();
  }, [presentInWishlistLocal, wishlist, product]);
  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === product._id) {
        setTooltipText("Already added");
      }
    }
  }, [cart, product]);
  const deleteFromWishlist = () => {
    toast.info(`${product.title} removed from wishlist`);
    removeFromWishlist(product._id, user.token)
      .then((res) => {
        if (res.data.ok) {
          setFav(false);
          let wishlistTemp = [];
          if (typeof window !== "undefined") {
            if (localStorage.getItem("wishlist")) {
              wishlistTemp = JSON.parse(localStorage.getItem("wishlist"));
            }

            wishlistTemp.map(
              (prod, i) => prod._id === product._id && wishlistTemp.splice(i, 1)
            );

            localStorage.setItem("wishlist", JSON.stringify(wishlistTemp));
            dispatch({
              type: "ADD_TO_WISHLIST",
              payload: wishlistTemp,
            });
          }
        }
      })
      .catch((err) =>
        console.log(`${err} happened while removing from wishlist`)
      );
  };
  const addToWishlistFunc = () => {
    //toast.success("Added to wishlist");
    addToWishlist(product._id, user.token)
      .then((res) => {
        if (res.data.ok) {
          setFav(true);
          let wishlistTemp = [];
          if (typeof window !== "undefined") {
            if (localStorage.getItem("wishlist")) {
              wishlistTemp = JSON.parse(localStorage.getItem("wishlist"));
            }

            // push new product to wishlsit
            wishlistTemp.push(product);
            let unique = _.uniqWith(wishlistTemp, _.isEqual);
            // save to local storage
            localStorage.setItem("wishlist", JSON.stringify(unique));
            dispatch({
              type: "ADD_TO_WISHLIST",
              payload: wishlistTemp,
            });
            dispatch({
              type: "SET_VISIBLE_WISHLIST",
              payload: true,
            });
          }
        }
      })
      .catch((err) => console.log(`${err} happened while adding to wishlist`));
  };
  //checkIfExists();
  const colors = [
    red[200],
    purple[200],
    teal[200],
    lightGreen[200],
    lime[200],
    amber[200],
  ];
  let bgColorAvatar = colors[getRandomInt(0, colors.length - 1)];
  const handleAddToCart = (e) => {
    e.preventDefault();
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltipText("Already added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  return (
    <Card className={classes.cardClass}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="category"
            style={{
              backgroundColor: bgColorAvatar,
            }}
          >
            {title[0]}
          </Avatar>
        }
        action={
          user && showWishlistBtn ? (
            <IconButton
              aria-label="favourite"
              onClick={(event) => {
                event.preventDefault();
                if (fav) {
                  deleteFromWishlist();
                } else {
                  addToWishlistFunc();
                }
              }}
              className={classes.favButtonIcon}
            >
              <FavoriteIcon style={{ fill: fav ? red[500] : "" }} />
            </IconButton>
          ) : (
            <></>
          )
        }
        title={truncate(title, 20)}
        // subheader={truncate(title, 55)}
        subheader={`Price: ₹${product.price}`}
      />
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pb-1">No ratings yet</div>
      )}
      <CardActionArea>
        {images && images.length > 0 ? (
          <Carousel autoPlay={false} animation="fade" indicators timeout={200}>
            {images.map((image) => (
              <CardMedia
                className={classes.mediaClass}
                component="img"
                key={image.public_id}
                image={image.url}
                style={{
                  height: 180,
                  objectFit: "contain",
                  cursor: "auto",
                }}
              />
            ))}
          </Carousel>
        ) : (
          <CardMedia
            className={classes.mediaClass}
            component="img"
            title={title}
            image={defaultLaptop}
            style={{
              height: 180,
              objectFit: "contain",
              cursor: "auto",
            }}
          />
        )}
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {truncate(description, 250)}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="between">
          <Link to={`/product/${slug}`}>
            <Button
              endIcon={<VisibilityIcon />}
              style={{ color: lightGreen[600] }}
            >
              View Product
            </Button>
          </Link>

          {product.quantity > 0 ? (
            <Tooltip title={tooltipText}>
              <Button
                endIcon={<AddShoppingCartIcon />}
                style={{ color: teal[300] }}
                onClick={handleAddToCart}
                className="ml-1"
              >
                Add to Cart
              </Button>
            </Tooltip>
          ) : (
            <Button
              endIcon={<AddShoppingCartIcon />}
              className="text-danger"
              disabled
            >
              Out of Stock
            </Button>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
