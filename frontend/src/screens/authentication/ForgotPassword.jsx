import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {
  Container,
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
import { MailFilled } from "@ant-design/icons";
import forgotPwdImg from "../../assets/forgotPassword.svg";
import { Spin } from "antd";
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
    marginLeft: theme.spacing(3),
    padding: theme.spacing(2),
  },
  headerField: {
    margin: theme.spacing(2),
    display: "block",
  },
  attrField: {
    width: "115%",
    paddingRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  btn: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  btn2: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
const validEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};
const ForgotPassword = ({ history }) => {
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user,history]);
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth.sendPasswordResetEmail(emailValue, actionCodeSettings).then(
        () => {
            console.log("EMAIL: ",emailValue);
            setEmailValue("");
            setLoading(false);
            toast.success("Check your email for password reset link");
        }
    ).catch(
        (error) => {
            setLoading(false);
            toast.error(`${error.message}`);
            console.log("ERROR MSG IN FORGOT PASSWORD",error);
        }
    );
  };
  const forgotPasswordForm = () => {
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
            Forgot Password?
          </Typography>
          <Grid container justifyContent="center" alignContent="center">
            <FormControl noValidate autoComplete="off">
              <CardMedia
                className={classes.media}
                image={forgotPwdImg}
                title="Forgot Password?"
              />
              <TextField
                name="email"
                placeholder="abc@gmail.com"
                label="Email address"
                className={classes.attrField}
                onChange={(e) => setEmailValue(e.target.value)}
                variant="outlined"
                helperText="Email ID with which you had an account"
                required
                value={emailValue}
              />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                  className={classes.btn2}
                  endIcon={<MailFilled />}
                  disabled={!validEmail(emailValue)}
                  //disabled
                >
                  Send Mail for reset password
                </Button>
              </CardActions>
            </FormControl>
          </Grid>
        </CardActionArea>
      </Card>
    );
  };
  return (
    <Container>
      {loading ? (
        <Spin spinning={loading} size="large" tip="Loading..." />
      ) : (
        forgotPasswordForm()
      )}
    </Container>
  );
};

export default ForgotPassword;
