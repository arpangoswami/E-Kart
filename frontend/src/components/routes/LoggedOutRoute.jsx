import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectToShop from "./RedirectToShop";
const LoggedOutRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? <RedirectToShop /> : <Route {...rest} />;
};

export default LoggedOutRoute;
