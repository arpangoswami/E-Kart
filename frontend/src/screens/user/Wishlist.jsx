import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist, removeFromWishlist } from "../../functions/cart";
import ProductCard from "../../components/cards/ProductCard";
import { Typography, Divider, IconButton } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { toast } from "react-toastify";
const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const loadWishListProds = useCallback(() => {
    getWishlist(user.token)
      .then((res) => setProducts(res.data.wishlist))
      .catch((err) =>
        console.log(`${err} happened while fetching whishlisted products`)
      );
  }, [user, setProducts]);
  useEffect(() => {
    loadWishListProds();
  }, [loadWishListProds]);
  const dispatch = useDispatch();
  const deleteFromWishlist = (id) => {
    toast.info("Product removed from wishlist");
    removeFromWishlist(id, user.token)
      .then((res) => {
        if (res.data.ok) {
          let newWishlist = products;
          newWishlist.map((p, i) => p._id === id && newWishlist.splice(i, 1));
          setProducts(newWishlist);
          dispatch({
            type: "ADD_TO_WISHLIST",
            payload: newWishlist,
          });
          if (typeof window !== undefined) {
            localStorage.setItem("wishlist", newWishlist);
          }
          loadWishListProds();
        }
      })
      .catch((err) =>
        console.log(`${err} happened while removing from wishlist`)
      );
  };
  return (
    <div className="container-fluid">
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center pt-5 mb-2"
      >
        {products && products.length > 0
          ? `Wishlisted Products | ${products.length} products`
          : "Empty Wishlist"}
      </Typography>
      <Divider />
      <div className="row">
        {products.map((p) => (
          <div
            key={p._id}
            className="col-md-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={p} showWishlistBtn={false} />
          </div>
        ))}
      </div>
      <div className="row">
        {products.map((p) => (
          <div
            key={p._id}
            className="col-md-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <IconButton
              className="text-danger"
              onClick={(e) => {
                e.preventDefault();
                deleteFromWishlist(p._id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;
