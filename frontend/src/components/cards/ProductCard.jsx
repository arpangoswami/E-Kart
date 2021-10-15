import React from "react";
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
import { Link } from "react-router-dom";
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
    height: 545,
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
const ProductCard = ({ product, handleAddtoCart }) => {
  const classes = useStyles();
  const { title, description, images, slug } = product;
  const colors = [
    red[200],
    purple[200],
    teal[200],
    lightGreen[200],
    lime[200],
    amber[200],
  ];
  let bgColorAvatar = colors[getRandomInt(0, colors.length - 1)];
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
        subheader={truncate(title, 60)}
      />
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
          <Button
            endIcon={<AddShoppingCartIcon />}
            color="#7cb342"
            style={{ color: teal[300] }}
            onClick={(e) => {
              e.preventDefault();
              handleAddtoCart(slug);
            }}
            className="ml-1"
          >
            Add to Cart
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
