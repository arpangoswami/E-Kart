import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getSingleProduct,
  updateProductReview,
  getRelatedProducts,
} from "../functions/product";
import ProductDetails from "../components/cards/ProductDetails";
import { Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  const [stars, setStars] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params.slug;
  const handleAddtoCart = () => {};
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
  }, [product.ratings, user]);
  const onStarClick = (newRating, name) => {
    setStars(newRating);
  };

  const loadSingleProduct = () => {
    getSingleProduct(match.params.slug)
      .then((res) => {
        setProduct(res.data);
        //load related products
        getRelatedProducts(res.data._id)
          .then((response) => setRelated(response.data))
          .catch((err) =>
            toast.error(`${err} happened while fetching related products`)
          );
      })
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
      {related && related.length > 0 && (
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
          <Grid container justify="center">
            {loading ? (
              <LoadingCard quantity={3} />
            ) : (
              related.map((p) => (
                <div key={p._id} className="row">
                  <ProductCard
                    product={p}
                    key={p._id}
                    handleAddtoCart={handleAddtoCart}
                  />
                </div>
              ))
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};
export default SingleProduct;
