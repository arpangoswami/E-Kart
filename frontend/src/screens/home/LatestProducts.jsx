import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {
  getProductsSorted,
  getTotalProductCount,
} from "../../functions/product";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import { toast } from "react-toastify";

const LatestProducts = ({ loading, setLoading, handleAddtoCart }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    loadLatest();
  }, [page]);
  useEffect(() => {
    getTotalProductCount().then((res) => setProductsCount(res.data.total));
  }, []);
  const loadLatest = () => {
    getProductsSorted("createdAt", "desc", page)
      .then((res) => {
        setLoading(false);
        setLatestProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`${err} happened while fetching products`);
      });
  };
  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };
  return (
    <div className="container">
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center"
      >
        Latest Products
      </Typography>

      <Grid container justify="center">
        {loading ? (
          <LoadingCard quantity={3} />
        ) : (
          latestProducts.map((p) => (
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
      <Grid container justify="center">
        <Pagination
          onChange={handleChange}
          color="primary"
          page={page}
          variant="outlined"
          className="mb-5 p-2"
          count={Math.ceil(productsCount / 3)}
        />
      </Grid>
    </div>
  );
};

export default LatestProducts;
