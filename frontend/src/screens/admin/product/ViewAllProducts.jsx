import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Grid } from "@material-ui/core";
import { getProductsByCount, deleteProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../components/cards/AdminProductCard";
const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const breakpointColumnsObj = {
    default: 3,
    600: 1,
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  const handleDelete = (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug}?`)) {
      deleteProduct(slug, user.token)
        .then((res) => {
          toast.info(`${res.data.title} has been deleted`);
          setProducts(
            products.filter((product) => product._id !== res.data._id)
          );
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };
  return (
    <div className="row">
      {loading && (
        <div className="container text-center">
          <Spin spinning={loading} size="large" tip="Loading..." />
        </div>
      )}
      <Grid container justify="center">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products.map((p) => (
            <div key={p._id}>
              <AdminProductCard product={p} handleDelete={handleDelete} />
            </div>
          ))}
        </Masonry>
      </Grid>
    </div>
  );
};
export default ViewAllProducts;
