import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../../components/cards/ProductCard";
import { getCategory } from "../../functions/category";
import { Grid, Typography } from "@material-ui/core";
import { Spin } from "antd";
const CategoryWiseProducts = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;
  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          `${err} happened while fetching products of ${slug} category`
        );
        setLoading(false);
      });
  }, [slug]);
  const showProducts = () =>
    products.map((product) => (
      <div key={product._id}>
        <ProductCard product={product} />
      </div>
    ));
  return (
    <>
      {loading ? (
        <div className="container text-center m-4">
          <Spin spinning={loading} size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <Typography
            variant="h3"
            color="primary"
            fontFamily="Quicksand"
            className="text-center pt-5"
          >
            {products && products.length > 0
              ? `${products.length} products found in ${category.name}`
              : `No products found in ${category.name}`}
          </Typography>
          <hr />
          <Grid container justify="center">
            {showProducts()}
          </Grid>
        </>
      )}
    </>
  );
};

export default CategoryWiseProducts;
