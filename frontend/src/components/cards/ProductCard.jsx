import React, { useState, useEffect } from "react";
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
    margin: theme.spacing(5),
  },
  mediaClass: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { title, description, images, slug } = product;

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));
  const [tooltipText, setTooltipText] = useState("Add to Cart");
  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === product._id) {
        setTooltipText("Already added");
      }
    }
  }, []);

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
              color="#7cb342"
              style={{ color: lightGreen[600] }}
              className="mr-2"
            >
              View Product
            </Button>
          </Link>

          <Tooltip title={tooltipText}>
            <Button
              endIcon={<AddShoppingCartIcon />}
              color="#7cb342"
              style={{ color: teal[300] }}
              onClick={handleAddToCart}
              className="ml-1"
            >
              Add to Cart
            </Button>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
