import React, { useState } from "react";
import {
  Card,
  makeStyles,
  Grid,
  Paper,
  CardMedia,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Button,
  Tab,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { pink, lightGreen } from "@material-ui/core/colors";
import Carousel from "react-material-ui-carousel";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ProductListItems from "./ProductListItems";
import defaultLaptop from "../../assets/defaultLaptop.jpg";
import { showAverage } from "../../functions/rating.js";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
const useStyles = makeStyles((theme) => ({
  paperClass: {
    height: 540,
    alignContent: "center",
    padding: theme.spacing(3),
  },
  cardClass: {
    height: 540,
    padding: theme.spacing(3),
  },
  mediaClass: {
    width: "100%",
  },
  appBar: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "103%",
  },
}));
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}
function secondPart(source, size) {
  return source.length > size
    ? source.slice(size, source.length - 1) +
        "\n" +
        "Contact company website for more details"
    : "Contact company website for more details";
}
const ProductDetails = ({ product, onStarClick, stars, onOkFunction }) => {
  const classes = useStyles();
  const { title, images, description, _id } = product;
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, value) => {
    setTabValue(value);
  };
  return (
    <>
      <div className="col-md-7">
        <Card className={classes.cardClass}>
          <CardHeader
            title={
              <Typography
                variant="h6"
                color="secondary"
                fontFamily="Quicksand"
                className="text-center"
              >
                {title}
              </Typography>
            }
          />
          <hr />
          <CardContent>
            {product && product.ratings && product.ratings.length > 0 ? (
              showAverage(product)
            ) : (
              <div className="text-center pb-1">No ratings yet</div>
            )}
            <ProductListItems product={product} />
          </CardContent>
          <CardActions>
            <Grid container justify="between">
              <Button
                className="col-md-4"
                style={{ color: lightGreen[300] }}
                endIcon={<AddShoppingCartIcon />}
              >
                Add to Cart
              </Button>
              <Button
                className="col-md-4"
                style={{ color: pink[300] }}
                endIcon={<FavoriteBorderIcon />}
              >
                Wishlist
              </Button>
              <RatingModal onOkFunction={onOkFunction}>
                <StarRatings
                  name={_id}
                  numberOfStars={5}
                  rating={stars}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="purple"
                />
              </RatingModal>
            </Grid>
          </CardActions>
        </Card>
      </div>
      <div className="col-md-5">
        <Paper className={classes.paperClass}>
          {images && images.length > 0 ? (
            <Carousel
              autoPlay={false}
              animation="fade"
              indicators
              timeout={200}
            >
              {images.map((image) => (
                <CardMedia
                  className={classes.mediaClass}
                  component="img"
                  key={image.public_id}
                  image={image.url}
                  style={{
                    height: 480,
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
                height: 480,
                objectFit: "contain",
                cursor: "auto",
              }}
            />
          )}
        </Paper>
      </div>
      <Paper className={classes.appBar}>
        <TabContext value={tabValue}>
          <TabList onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Description" value="1" />
            <Tab label="More" value="2" />
          </TabList>
          <br />
          <TabPanel value="1">
            {description && truncate(description, 2000)}
          </TabPanel>
          <TabPanel value="2">
            {description && secondPart(description, 2000)}
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
};

export default ProductDetails;
