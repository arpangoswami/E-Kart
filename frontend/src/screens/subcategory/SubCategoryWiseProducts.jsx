import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../../components/cards/ProductCard";
import { getSubCategory } from "../../functions/subCategory";
import { Grid, Typography } from "@material-ui/core";
import { Spin } from "antd";
const SubCategoryWiseProducts = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;
  useEffect(() => {
    setLoading(true);
    getSubCategory(slug)
      .then((res) => {
        setSubCategory(res.data.subCategory);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          `${err} happened while fetching products of ${slug} subCategory`
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
              ? `${products.length} products found in ${subCategory.name}`
              : `No products found in ${subCategory.name}`}
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

export default SubCategoryWiseProducts;
