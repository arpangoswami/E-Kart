export const wishlistDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_VISIBLE_WISHLIST":
      return action.payload;
    default:
      return state;
  }
};
