import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { Grid } from "@material-ui/core";
import { getProductsByCount } from "../functions/product";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadPageProducts();
  }, []);
  const loadPageProducts = () => {
    getProductsByCount(6)
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error(`${err} happened while fetching products`));
  };
  return (
    <div>
      <p>Home</p>
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;
