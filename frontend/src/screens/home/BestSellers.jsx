import React, { useState, useEffect, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {
  getProductsSorted,
  getTotalProductCount,
} from "../../functions/product";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import { toast } from "react-toastify";

const BestSellers = ({ loading, setLoading }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const loadLatest = useCallback(() => {
    getProductsSorted("sold", "desc", page)
      .then((res) => {
        setLoading(false);
        setBestSellers(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`${err} happened while fetching products`);
      });
  }, [page, setLoading]);
  useEffect(() => {
    loadLatest();
  }, [loadLatest]);
  useEffect(() => {
    getTotalProductCount().then((res) => setProductsCount(res.data.total));
  }, []);
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
        Best Sellers
      </Typography>

      <Grid container justify="center">
        {loading ? (
          <LoadingCard quantity={3} />
        ) : (
          bestSellers.map((p) => (
            <div key={p._id} className="row">
              <ProductCard product={p} />
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
          className="mt-4 mb-4 p-2"
          count={Math.ceil(productsCount / 3)}
        />
      </Grid>
    </div>
  );
};

export default BestSellers;
