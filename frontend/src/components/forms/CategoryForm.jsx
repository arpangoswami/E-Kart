import React from "react";
import {
  Card,
  Typography,
  Button,
  makeStyles,
  TextField,
  Grid,
  CardActions,
  CardMedia,
  CardActionArea,
  FormControl,
} from "@material-ui/core";
import createCategoryImg from "../../assets/createCategory.svg";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme) => ({
  cardClass: {
    maxWidth: 600,
    maxHeight: 800,
    [theme.breakpoints.down("md")]: {
      maxWidth: 400,
      maxheight: 533,
    },
    alignContent: "center",
    marginTop: theme.spacing(4),
    margin: "auto",
    flexDirection: "column",
  },
  media: {
    width: 252,
    height: 252,
    [theme.breakpoints.down("sm")]: {
      width: 168,
      height: 168,
      marginLeft: 40,
    },
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  attrField: {
    width: "115%",
    paddingRight: theme.spacing(6),
  },
  btn: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const CategoryForm = ({
  handleSubmitForm,
  buttonText,
  title,
  categoryName,
  setCategoryName,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Card
      variant="elevation"
      style={{ backgroundColor: "#d0dfea" }}
      className={classes.cardClass}
    >
      <CardActionArea>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          align="center"
          gutterBottom
          className={classes.headerField}
        >
          {title}
        </Typography>
        <Grid container justifyContent="center" alignContent="center">
          <FormControl noValidate autoComplete="off">
            <CardMedia
              className={classes.media}
              image={createCategoryImg}
              title="Create a new category"
            />
            <TextField
              name="Category"
              placeholder="Eg:- Home Appliances"
              label="Create a new category"
              className={classes.attrField}
              onChange={(event) => setCategoryName(event.target.value)}
              value={categoryName}
              variant="outlined"
              helperText="At least 2 characters"
              required
              disabled={loading}
            />
            <br />
            <CardActions>
              <div className="container pl-5">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                  className={classes.btn}
                  endIcon={<CheckIcon />}
                  disabled={loading || categoryName.length < 2}
                >
                  {buttonText}
                </Button>
              </div>
            </CardActions>
            <br />
          </FormControl>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
export default CategoryForm;
