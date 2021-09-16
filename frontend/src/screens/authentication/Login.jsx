import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, googleAuthentication } from "../../firebase";
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
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import {
  GoogleOutlined,
  MailFilled,
  EyeInvisibleFilled,
  EyeFilled,
} from "@ant-design/icons";
import login from "../../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

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
    //marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(6),
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

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
const Login = ({history}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  //const history = useHistory();
  const dispatcher = useDispatch();
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard")
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user,history]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    //console.log("Password: ", password);
    if (!email || !password) {
      if (!email) {
        setEmailError(true);
        setLoading(false);
        toast.error("Email is a required field");
      }
      if (!password) {
        setPwdError(true);
        setLoading(false);
        toast.error("Password is a required field");
      }
      return;
    }
    if (password.length < 6) {
      setLoading(false);
      toast.error("Password should be atleast 6 characters long");
      return;
    }
    if (!validateEmail(email)) {
      setLoading(false);
      toast.error("Invalid email");
      return;
    }
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatcher({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log("ERROR SIGN IN: ", err));
    } catch (error) {
      console.log("ERROR:", error);
      toast.error(`Account doesn't exist, Please signup first`);
      setLoading(false);
    }
  };

  const googleLogin = async (event) => {
    event.preventDefault();
    auth
      .signInWithPopup(googleAuthentication)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatcher({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log("ERROR GOOGLE SIGN IN: ", err));
      })
      .catch((error) => {
        toast.error(`Error occured in Google signin ${error}`);
      });
  };

  const loginForm = () => {
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
            Login
          </Typography>
          <Grid container justifyContent="center" alignContent="center">
            <FormControl noValidate autoComplete="off">
              <CardMedia
                className={classes.media}
                image={login}
                title="Login User"
              />
              <TextField
                name="email"
                placeholder="abc@gmail.com"
                label="Email address"
                className={classes.attrField}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                helperText="Enter your Email ID"
                required
                value={email}
                error={emailError}
              />
              <br />
              <TextField
                name="password"
                placeholder="Password"
                label="Enter your password"
                className={classes.attrField}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                helperText="At least 6 characters"
                required
                type={showPassword ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={pwdError}
                value={password}
              />
              <br />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                  className={classes.btn2}
                  endIcon={<MailFilled />}
                >
                  Login with email
                </Button>
              </CardActions>
              <br />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={googleLogin}
                  className={classes.btn}
                  endIcon={<GoogleOutlined />}
                >
                  Login with Google
                </Button>
              </CardActions>
              <CardActions>
                <Link to="/forgot/password" className="float-right text-danger">
                  Forgot Password
                </Link>
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
        <div className="container p-5 text-center">
          <Spin spinning={loading} size="large" tip="Loading..." />
        </div>
      ) : (
        loginForm()
      )}
    </Container>
  );
};

export default Login;
