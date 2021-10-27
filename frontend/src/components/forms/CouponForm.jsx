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
import "date-fns";
import couponDiscount from "../../assets/couponDiscount.svg";
import CheckIcon from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { toast } from "react-toastify";
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
    margin: theme.spacing(2),
  },
  percentField: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));
const imageStyle = {
  justifyContent: "center",
  display: "flex",
};
const CouponForm = ({
  handleSubmitForm,
  buttonText,
  title,
  couponName,
  setCouponName,
  expiryDate,
  setExpiryDate,
  discountPercent,
  setDiscountPercent,
  loading,
}) => {
  const handleDateChange = (date) => {
    setExpiryDate(date);
  };
  const handlePercentChange = (e) => {
    let discount = e.target.value < 1 ? 1 : e.target.value;
    if (discount > 100) {
      toast.error(`Max available discount is ${100}%`);
      return;
    }
    setDiscountPercent(discount);
  };
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
        <Grid container justify="center">
          <FormControl noValidate autoComplete="off">
            <div style={imageStyle}>
              <CardMedia
                className={classes.media}
                image={couponDiscount}
                title="Create a new coupon"
              />
            </div>

            <TextField
              name="Coupon"
              placeholder="Eg:- ARPA100"
              label="Create a new coupon"
              onChange={(event) => setCouponName(event.target.value)}
              value={couponName}
              variant="outlined"
              helperText="At least 2 characters"
              required
              disabled={loading}
            />
            <br />
            <Grid container justify="center">
              <div className="row">
                <div className="col-md-6">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="dd/MM/yyyy"
                      value={expiryDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-6">
                  <TextField
                    name="discount"
                    type="number"
                    placeholder="Eg:- 50"
                    label="Enter percentage of discount"
                    helperText="Value must be within 1 and 100"
                    value={discountPercent}
                    onChange={handlePercentChange}
                    className={classes.percentField}
                  />
                </div>
              </div>
            </Grid>
            <Grid container justify="center">
              <CardActions>
                <div className="container pl-5">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitForm}
                    className={classes.btn}
                    endIcon={<CheckIcon />}
                    disabled={loading || couponName.length < 6}
                  >
                    {buttonText}
                  </Button>
                </div>
              </CardActions>
            </Grid>
            <br />
          </FormControl>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
export default CouponForm;
