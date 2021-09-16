import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import {
  Container,
  Card,
  Typography,
  Button,
  makeStyles,
  CardActionArea,
  TextField,
  Grid,
  CardActions,
  CardMedia,
} from "@material-ui/core";
import welcome from "../../assets/welcome.svg";
import { useSelector } from "react-redux";
import MailIcon from "@material-ui/icons/Mail";
const useStyles = makeStyles((theme) => ({
  cardClass: {
    maxWidth: 600,
    maxHeight: 600,
    [theme.breakpoints.down("md")]: {
      maxWidth: 400,
      maxheight: 400,
    },
    alignContent: "center",
    marginTop: theme.spacing(6),
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
    padding: theme.spacing(2),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  attrField: {
    width: "120%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingRight: theme.spacing(6),
  },
  btn: {
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
const Signup = ({ history }) => {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [emailError, setEmailError] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  const handleSubmitForm = async (data) => {
    if (!validateEmail(data.email)) {
      setEmailError(true);
      toast.error(`Invalid email format ${data.email}`);
      return;
    }
    setEmailError(false);
    const actionCodeSettings = {
      url: process.env.REACT_APP_SIGNUP_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendSignInLinkToEmail(data.email, actionCodeSettings)
      .then(function () {
        toast.success(
          `Email is sent to ${data.email}. Click on the link to complete registration`
        );
        window.localStorage.setItem("emailForSignup", data.email);
        reset();
      })
      .catch(function (error) {
        setEmailError(true);
        toast.error(`Email NOT sent to ${data.email}. Some ${error} occured`);
      });
  };

  const signUpForm = () => {
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
            Verify Email for Signing up
          </Typography>
          <Grid container justifyContent="center" alignContent="center">
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <CardMedia
                className={classes.media}
                image={welcome}
                title="Welcome User"
              ></CardMedia>
              <TextField
                name="email"
                placeholder="Eg:- abc@gmail.com"
                label="Email address"
                className={classes.attrField}
                variant="outlined"
                helperText="Enter your Email ID"
                required
                {...register("email", {
                  required: "Required Fields",
                  message: "Invalid email",
                })}
                error={emailError}
              />
              <br />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  endIcon={<MailIcon />}
                >
                  Send Email
                </Button>
              </CardActions>
            </form>
          </Grid>
        </CardActionArea>
      </Card>
    );
  };
  return <Container>{signUpForm()}</Container>;
};
export default Signup;
