import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { cartDrawerReducer } from "./cartDrawerReducer";
import { couponReducer } from "./couponReducer";
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: cartDrawerReducer,
  coupon: couponReducer,
});

export default rootReducer;
