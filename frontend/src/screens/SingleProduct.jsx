import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSingleProduct, updateProductReview } from "../functions/product.js";

import ProductDetails from "../components/cards/ProductDetails";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
const SingleProduct = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const onOkFunction = () => {
    updateProductReview(product._id, stars, user.token)
      .then((res) => {
        toast.success("Thanks for your review. It will appear soon");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    loadSingleProduct();
  }, [match.params.slug]);
  useEffect(() => {
    if (product.ratings && user) {
      let existingRating = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
      );
      existingRating && setStars(existingRating.star);
    }
  }, []);
  const onStarClick = (newRating, name) => {
    setStars(newRating);
  };

  const loadSingleProduct = () => {
    getSingleProduct(match.params.slug)
      .then((res) => setProduct(res.data))
      .catch((err) => toast.error(`${err} happened while fetching product`));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductDetails
          product={product}
          onStarClick={onStarClick}
          stars={stars}
          onOkFunction={onOkFunction}
        />
      </div>
      <div className="container">
        <Typography
          variant="h3"
          color="primary"
          fontFamily="Quicksand"
          className="text-center pt-5"
        >
          Related Products
        </Typography>
        <hr />
      </div>
    </div>
  );
};
export default SingleProduct;
