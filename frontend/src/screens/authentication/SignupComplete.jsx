import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
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
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import welcome from "../../assets/welcome.svg";
import { createOrUpdateUser } from "../../functions/auth";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles((theme) => ({
  cardClass: {
    maxWidth: 600,
    maxHeight: 700,
    [theme.breakpoints.down("md")]: {
      maxWidth: 400,
      maxheight: 467,
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
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(6),
  },
  btn: {
    marginLeft: theme.spacing(10),
    marginBottom: theme.spacing(4),
  },
}));

const SignupComplete = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatcher = useDispatch();
  //const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignup"));
  }, [history]);
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    console.log("Password: ", password);
    if (!email || !password) {
      if (!email) {
        setEmailError(true);
        toast.error("Email is a required field");
      }
      if (!password) {
        setPwdError(true);
        toast.error("Password is a required field");
      }
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForSignup");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
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
          })
          .catch((err) => console.log("ERROR SIGNUP COMPLETE: ", err));
        //redirect
        history.push("/");
        toast.success("Signup successful!");
        return;
      } else {
        toast.error(`Invalid link! Please start from beginning`);
      }
    } catch (error) {
      toast.error(`Invalid link! Please start from beginning`);
    }
  };
  const signUpFormComplete = () => {
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
            <FormControl
              noValidate
              autoComplete="off"
              onSubmit={handleSubmitForm}
            >
              <CardMedia
                className={classes.media}
                image={welcome}
                title="Welcome User"
              />
              <TextField
                name="email"
                label="Email address"
                className={classes.attrField}
                variant="outlined"
                helperText="Enter your Email ID"
                required
                disabled
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
              />
              <br />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                  className={classes.btn}
                  endIcon={<CheckIcon />}
                >
                  Signup
                </Button>
              </CardActions>
            </FormControl>
          </Grid>
        </CardActionArea>
      </Card>
    );
  };
  return <Container>{signUpFormComplete()}</Container>;
};

export default SignupComplete;
