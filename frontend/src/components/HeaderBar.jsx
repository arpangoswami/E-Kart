import React, { useState } from "react";
import { alpha, makeStyles, useTheme } from "@material-ui/core/styles";

//material ui components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
//icons
import MenuIcon from "@material-ui/icons/Menu";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
//import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
//user drawer
import HistoryIcon from "@material-ui/icons/History";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import CreateIcon from "@material-ui/icons/Create";
import FolderIcon from "@material-ui/icons/Folder";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
//admin drawer

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./forms/SearchForm";
import firebase from "firebase";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  title: {
    fontFamily: "Noto+Sans+JP",
    fontWeight: 700,
    flexGrow: 10,
    display: "none",
    color: "#FDEFEF",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBarText: {
    display: "none",
    color: "#FDEFEF",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  lighterAppBarHover: {
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,

  //side drawer
  drawerButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  activeItemDrawer: {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}));

export default function HeaderBar({ window }) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  //const [wishlistCount, setWishlistCount] = useState(5);

  const dispatcher = useDispatch();
  const { user, cart } = useSelector((state) => {
    return { ...state };
  });

  const logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    dispatcher({
      type: "LOGOUT",
      payload: null,
    });
    handleMenuClose();
    history.push("/login");
  };

  const redirectSignup = (event) => {
    event.preventDefault();
    handleMenuClose();
    history.push("/signup");
  };

  const redirectHome = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const redirectLogin = (event) => {
    event.preventDefault();
    handleMenuClose();
    history.push("/login");
  };

  const redirectCart = (event) => {
    event.preventDefault();
    history.push("/cart");
  };
  const redirectShop = (event) => {
    event.preventDefault();
    history.push("/shop");
  };

  const redirectAdminDashboard = (e) => {
    e.preventDefault();
    history.push("/admin/dashboard");
  };

  const redirectDashboard = (e) => {
    e.preventDefault();
    history.push("/user/dashboard");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userItems = [
    {
      text: "User Dashboard",
      icon: <DashboardIcon color="secondary" />,
      path: "/user/dashboard",
    },
    {
      text: "History",
      icon: <HistoryIcon color="secondary" />,
      path: "/user/history",
    },
    {
      text: "Change Password",
      icon: <LockOpenIcon color="secondary" />,
      path: "/user/update-password",
    },
    // {
    //   text: "Wishlist",
    //   icon: <FavoriteBorderIcon color="secondary" />,
    //   path: "/user/wishlist",
    // },
  ];
  const userDrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {userItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const adminItems = [
    {
      text: "Admin Dashboard",
      icon: <DashboardIcon color="secondary" />,
      path: "/admin/dashboard",
    },
    {
      text: "Change Password",
      icon: <LockOpenIcon color="secondary" />,
      path: "/user/update-password",
    },
    {
      text: "Create product",
      icon: <AddCircleOutlineIcon color="secondary" />,
      path: "/admin/create-product",
    },
    {
      text: "Manage product",
      icon: <CreateIcon color="secondary" />,
      path: "/admin/manage-product",
    },
    {
      text: "Manage category",
      icon: <CreateNewFolderIcon color="secondary" />,
      path: "/admin/manage-category",
    },
    {
      text: "Manage sub-category",
      icon: <FolderIcon color="secondary" />,
      path: "/admin/manage-subcategory",
    },
    {
      text: "Coupons",
      icon: <LocalOfferIcon color="secondary" />,
      path: "/admin/coupon",
    },
  ];
  const adminDrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {adminItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!user && (
        <MenuItem onClick={redirectLogin}>
          <IconButton aria-label="login" color="inherit">
            <LoginOutlined />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}

      {!user && (
        <MenuItem onClick={redirectSignup}>
          <IconButton aria-label="signup" color="inherit">
            <PersonAddIcon />
          </IconButton>
          <p>Signup</p>
        </MenuItem>
      )}

      {user && (
        <MenuItem onClick={logout}>
          <IconButton aria-label="signup" color="inherit">
            <LogoutOutlined />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}

      {user && user.role === "admin" && (
        <MenuItem onClick={redirectAdminDashboard}>
          <IconButton aria-label="signup" color="inherit">
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      )}
      {user && user.role !== "admin" && (
        <MenuItem onClick={redirectDashboard}>
          <IconButton aria-label="signup" color="inherit">
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      )}
    </Menu>
  );

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show-wishlist" color="inherit">
          <Badge badgeContent={wishlistCount} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Wishlist</p>
      </MenuItem> */}
      <MenuItem onClick={redirectCart}>
        <IconButton aria-label="show-cart" color="inherit">
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={redirectShop}>
        <IconButton aria-label="show-cart" color="inherit">
          <StorefrontRoundedIcon />
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      {!user && (
        <MenuItem onClick={redirectLogin}>
          <IconButton aria-label="login" color="inherit">
            <LoginOutlined />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
      {!user && (
        <MenuItem onClick={redirectSignup}>
          <IconButton aria-label="signup" color="inherit">
            <PersonAddIcon />
          </IconButton>
          <p>Signup</p>
        </MenuItem>
      )}
      {user && (
        <MenuItem onClick={logout}>
          <IconButton aria-label="signup" color="inherit">
            <LogoutOutlined />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
      {user && user.role === "admin" && (
        <MenuItem onClick={redirectAdminDashboard}>
          <IconButton aria-label="signup" color="inherit">
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      )}
      {user && user.role !== "admin" && (
        <MenuItem onClick={redirectDashboard}>
          <IconButton aria-label="signup" color="inherit">
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow + " " + classes.toolbar}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.drawerButton}
            >
              <Typography
                color="secondary"
                variant="button"
                className={classes.appBarText}
              >
                Menu
              </Typography>
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            E-Kart
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="home-button"
            onClick={redirectHome}
          >
            <HomeIcon />
          </IconButton>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton
              aria-label="show-wishlist"
              className={classes.lighterAppBarHover}
              color="inherit"
            >
              <Badge badgeContent={wishlistCount} color="secondary">
                <Typography
                  color="secondary"
                  variant="button"
                  className={classes.appBarText}
                >
                  Wishlist
                </Typography>
                <FavoriteIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              aria-label="show-cart"
              className={classes.lighterAppBarHover}
              color="inherit"
              onClick={redirectCart}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <Typography
                  color="secondary"
                  variant="button"
                  className={classes.appBarText}
                >
                  Cart
                </Typography>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show-cart"
              className={classes.lighterAppBarHover}
              color="inherit"
              onClick={redirectShop}
            >
              <Typography
                color="secondary"
                variant="button"
                className={classes.appBarText}
              >
                Shop
              </Typography>
              <StorefrontRoundedIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              className={classes.lighterAppBarHover}
              color="inherit"
            >
              <Typography
                color="secondary"
                variant="button"
                className={classes.appBarText}
              >
                {user ? user.email.split("@")[0] : "Profile"}
              </Typography>
              <AccountCircleIcon />
            </IconButton>
          </div>
          <div
            className={classes.sectionMobile + " " + classes.lighterAppBarHover}
          >
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
      </AppBar>

      <nav className={classes.drawer} aria-label="side-drawer">
        {user && user.role !== "admin" && (
          <>
            <Hidden smUp implementation="css">
              <SwipeableDrawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {userDrawer}
              </SwipeableDrawer>
            </Hidden>
          </>
        )}
        {user && user.role === "admin" && (
          <>
            <Hidden smUp implementation="css">
              <SwipeableDrawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {adminDrawer}
              </SwipeableDrawer>
            </Hidden>
          </>
        )}
      </nav>
    </div>
  );
}
