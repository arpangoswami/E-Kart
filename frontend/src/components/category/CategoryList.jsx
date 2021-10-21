import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../functions/category";
import { Spin } from "antd";
import { Paper, Grid, Typography } from "@material-ui/core";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`${err} occured while fetching all categories`);
        setLoading(false);
      });
  }, []);
  const showCategories = () =>
    categories.map((c) => (
      <Paper
        key={c._id}
        className="col col-md-3 btn btn-outlined-primary btn-md btn-raised m-3 btn-light"
      >
        <Link to={`/category/${c.slug}`}>
          <Typography variant="h6">{c.name}</Typography>
        </Link>
      </Paper>
    ));
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <div className="container text-center m-4">
            <Spin spinning={loading} size="large" tip="Loading..." />
          </div>
        ) : (
          <Grid container justify="center">
            {showCategories()}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
