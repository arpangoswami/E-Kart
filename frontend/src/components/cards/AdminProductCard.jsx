import React from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  IconButton,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
} from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
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
    height: 500,
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
const AdminProductCard = ({ product, key, handleDelete }) => {
  const classes = useStyles();
  const { title, description, images, slug } = product;
  const imageLink = images && images.length > 0 ? images[0].url : defaultLaptop;
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
    <>
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
          <CardMedia
            className={classes.mediaClass}
            component="img"
            title={title}
            image={imageLink}
            style={{
              maxHeight: 180,
              minHeight: 100,
              height: "auto",
              objectFit: "contain",
              cursor: "auto",
            }}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncate(description, 250)}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Link to={`/admin/update/product/${slug}`}>
              <IconButton
                variant="contained"
                color="primary"
                className="text-info mr-4"
              >
                <BorderColorIcon />
              </IconButton>
            </Link>

            <IconButton
              variant="contained"
              color="primary"
              className="text-danger ml-4"
              onClick={() => handleDelete(slug)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default AdminProductCard;
