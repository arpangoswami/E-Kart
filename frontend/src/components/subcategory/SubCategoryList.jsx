import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSubCategories } from "../../functions/subCategory";
import { Spin } from "antd";
import { Paper, Grid, Typography } from "@material-ui/core";
const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllSubCategories()
      .then((res) => {
        setSubCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`${err} occured while fetching all sub-categories`);
        setLoading(false);
      });
  }, []);
  const showCategories = () =>
    subCategories.map((c) => (
      <Paper
        key={c._id}
        className="col col-md-3 btn btn-outlined-primary btn-md btn-raised m-3 btn-light"
      >
        <Link to={`/sub-category/${c.slug}`}>
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

export default SubCategoryList;
