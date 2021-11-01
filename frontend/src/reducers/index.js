import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { cartDrawerReducer } from "./cartDrawerReducer";
import { couponReducer } from "./couponReducer";
import { wishlistDrawerReducer } from "./wishlistDrawerReducer";
import { wishlistReducer } from "./wishlistReducer";
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: cartDrawerReducer,
  coupon: couponReducer,
  wishlistDrawer: wishlistDrawerReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
