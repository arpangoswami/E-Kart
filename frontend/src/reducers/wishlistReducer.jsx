let initialState = [];

if (typeof window !== undefined) {
  if (localStorage.getItem("wishlist")) {
    initialState = JSON.parse(localStorage.getItem("wishlist"));
  }
}

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return action.payload;
    default:
      return state;
  }
};
