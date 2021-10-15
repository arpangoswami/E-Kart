import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSingleProduct } from "../functions/product.js";
import ProductDetails from "../components/cards/ProductDetails";
import { Typography } from "@material-ui/core";
const SingleProduct = ({ match, history }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    loadSingleProduct();
  }, [match.params.slug]);
  const loadSingleProduct = () => {
    getSingleProduct(match.params.slug)
      .then((res) => setProduct(res.data))
      .catch((err) => toast.error(`${err} happened while fetching product`));
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductDetails product={product} />
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
