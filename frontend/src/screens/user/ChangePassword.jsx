import React, { useState } from "react";
//import UserNav from "../../components/navigation/UserNavigation";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
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
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import changePwdImg from "../../assets/authentication.svg";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
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
const ChangePassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!password || password.length < 6) {
      setPwdError(true);
      toast.error(
        "Password is a required field and must be of atleast 6 characters"
      );
      return;
    }
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password updated");
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  const passWordForm = () => {
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
            Change Password
          </Typography>
          <Grid container justifyContent="center" alignContent="center">
            <FormControl noValidate autoComplete="off">
              <CardMedia
                className={classes.media}
                image={changePwdImg}
                title="Change Password"
              />
              <TextField
                name="password"
                placeholder="Password"
                label="Enter your password"
                className={classes.attrField}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={pwdError}
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
                    endIcon={<LockIcon />}
                    disabled={loading}
                  >
                    Change Password
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
  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2">
          <UserNav />
        </div> */}
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <>{passWordForm()}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
