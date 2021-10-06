import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
const AdminRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("THIS USER IS ADMIN: ", res);
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log("UNAUTHORIZED ADMIN ACCESS: ", err);
          setIsAdmin(false);
        });
    }
  }, [user]);
  return isAdmin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoutes;
