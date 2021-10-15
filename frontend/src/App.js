import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/authentication/Login";
import Signup from "./screens/authentication/Signup";
import Home from "./screens/Home";
import Shop from "./screens/Cart/Shop";
import Cart from "./screens/Cart/Cart";
import SignupComplete from "./screens/authentication/SignupComplete";
import ForgotPassword from "./screens/authentication/ForgotPassword";
import UserDashboard from "./screens/user/UserDashboard";
import Layout from "./components/Layout";
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import ChangePassword from "./screens/user/ChangePassword";
import Wishlist from "./screens/user/Wishlist";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ManageCategories from "./screens/admin/category/ManageCategories";
import UpdateCategory from "./screens/admin/category/UpdateCategory";
import CreateProduct from "./screens/admin/product/CreateProduct";
import ManageSubCategory from "./screens/admin/subcategory/ManageSubCategory";
import UpdateSubCategory from "./screens/admin/subcategory/UpdateSubCategory";
import ViewAllProducts from "./screens/admin/product/ViewAllProducts";
import UpdateProduct from "./screens/admin/product/UpdateProduct";
import SingleProduct from "./screens/SingleProduct";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { deepPurple, indigo } from "@material-ui/core/colors";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: indigo,
  },
  typography: {
    fontFamily: ["Noto+Sans+JP", "Quicksand"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
function App() {
  const dispatcher = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
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
          .catch((err) => console.log("ERROR LOADING PAGE REDUX: ", err));
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [dispatcher]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup/complete" component={SignupComplete} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/forgot/password" component={ForgotPassword} />
            <UserRoutes
              exact
              path="/user/dashboard"
              component={UserDashboard}
            />
            <UserRoutes exact path="/user/wishlist" component={Wishlist} />
            <UserRoutes
              exact
              path="/user/update-password"
              component={ChangePassword}
            />
            <AdminRoutes
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoutes
              exact
              path="/admin/manage-category"
              component={ManageCategories}
            />
            <AdminRoutes
              exact
              path="/admin/update/category/:slug"
              component={UpdateCategory}
            />
            <AdminRoutes
              exact
              path="/admin/manage-subcategory"
              component={ManageSubCategory}
            />
            <AdminRoutes
              exact
              path="/admin/update/sub-category/:slug"
              component={UpdateSubCategory}
            />
            <AdminRoutes
              exact
              path="/admin/create-product"
              component={CreateProduct}
            />
            <AdminRoutes
              exact
              path="/admin/manage-product"
              component={ViewAllProducts}
            />
            <AdminRoutes
              exact
              path="/admin/update/product/:slug"
              component={UpdateProduct}
            />
            <Route exact path="/product/:slug" component={SingleProduct} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
