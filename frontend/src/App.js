import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getWishlist } from "./functions/cart";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { deepPurple, indigo } from "@material-ui/core/colors";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
const Login = lazy(() => import("./screens/authentication/Login"));
const Signup = lazy(() => import("./screens/authentication/Signup"));
const Home = lazy(() => import("./screens/Home"));
const Shop = lazy(() => import("./screens/Shop"));
const Cart = lazy(() => import("./screens/Cart"));
const SignupComplete = lazy(() =>
  import("./screens/authentication/SignupComplete")
);
const ForgotPassword = lazy(() =>
  import("./screens/authentication/ForgotPassword")
);
const UserHistory = lazy(() => import("./screens/user/UserHistory"));
const Layout = lazy(() => import("./components/Layout"));
const UserRoutes = lazy(() => import("./components/routes/UserRoutes"));
const LoggedOutRoute = lazy(() => import("./components/routes/LoggedOutRoute"));
const AdminRoutes = lazy(() => import("./components/routes/AdminRoutes"));
const ChangePassword = lazy(() => import("./screens/user/ChangePassword"));
const Wishlist = lazy(() => import("./screens/user/Wishlist"));
const AdminDashboard = lazy(() => import("./screens/admin/AdminDashboard"));
const ManageCategories = lazy(() =>
  import("./screens/admin/category/ManageCategories")
);
const CreateCoupon = lazy(() => import("./screens/admin/coupon/CreateCoupon"));
const UpdateCoupon = lazy(() => import("./screens/admin/coupon/UpdateCoupon"));
const UpdateCategory = lazy(() =>
  import("./screens/admin/category/UpdateCategory")
);
const CreateProduct = lazy(() =>
  import("./screens/admin/product/CreateProduct")
);
const ManageSubCategory = lazy(() =>
  import("./screens/admin/subcategory/ManageSubCategory")
);
const UpdateSubCategory = lazy(() =>
  import("./screens/admin/subcategory/UpdateSubCategory")
);
const ViewAllProducts = lazy(() =>
  import("./screens/admin/product/ViewAllProducts")
);
const UpdateProduct = lazy(() =>
  import("./screens/admin/product/UpdateProduct")
);
const SingleProduct = lazy(() => import("./screens/SingleProduct"));
const CategoryWiseProducts = lazy(() =>
  import("./screens/category/CategoryWiseProducts")
);
const SubCategoryWiseProducts = lazy(() =>
  import("./screens/subcategory/SubCategoryWiseProducts")
);
const Checkout = lazy(() => import("./screens/Checkout"));
const Payment = lazy(() => import("./screens/Payment"));
const CartSideDrawer = lazy(() =>
  import("./components/sideDrawer/CartSideDrawer")
);
const WishlistSideDrawer = lazy(() =>
  import("./components/sideDrawer/WishlistSideDrawer")
);
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
  const { user } = useSelector((state) => ({ ...state }));
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
  useEffect(() => {
    if (user && user.token) {
      getWishlist(user.token)
        .then((res) => {
          dispatcher({
            type: "ADD_TO_WISHLIST",
            payload: res.data.wishlist,
          });
          if (typeof window !== undefined) {
            localStorage.setItem("wishlist", res.data.wishlist);
          }
        })
        .catch((err) =>
          console.log(`${err} happened while fetching user's wishlist`)
        );
    }
  }, [user, dispatcher]);
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          Arpan Ec
          <LoadingOutlined />
          mmerce
        </div>
      }
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CartSideDrawer />
          <WishlistSideDrawer />
          <ToastContainer />

          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <LoggedOutRoute exact path="/login" component={Login} />
              <Route path="/signup/complete" component={SignupComplete} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/forgot/password" component={ForgotPassword} />
              <UserRoutes exact path="/user/history" component={UserHistory} />
              <UserRoutes exact path="/wishlist" component={Wishlist} />
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
              <Route
                exact
                path="/category/:slug"
                component={CategoryWiseProducts}
              />
              <Route
                exact
                path="/sub-category/:slug"
                component={SubCategoryWiseProducts}
              />
              <UserRoutes exact path="/checkout" component={Checkout} />
              <AdminRoutes
                exact
                path="/admin/coupon"
                component={CreateCoupon}
              />
              <AdminRoutes
                exact
                path="/admin/update/coupon/:couponId"
                component={UpdateCoupon}
              />
              <UserRoutes exact path="/payment" component={Payment} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}
export default App;
