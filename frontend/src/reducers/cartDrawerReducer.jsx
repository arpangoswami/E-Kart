export const cartDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
