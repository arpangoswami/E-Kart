import React, { useState, lazy } from "react";
import { Typography } from "@material-ui/core";
import Jumbotron from "../components/cards/Jumbotron";
import LatestProducts from "./home/LatestProducts";
import BestSellers from "./home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subcategory/SubCategoryList";
const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="jumbotron h1 text-center font-weight-bold text-danger">
        <Jumbotron
          text={["Best Prices", "Original Products", "Latest Products"]}
        />
      </div>
      <LatestProducts setLoading={setLoading} loading={loading} />
      <BestSellers setLoading={setLoading} loading={loading} />
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center pt-5"
      >
        Categories
      </Typography>
      <hr />
      <CategoryList />
      <Typography
        variant="h3"
        color="primary"
        fontFamily="Quicksand"
        className="text-center pt-5"
      >
        Sub-Categories
      </Typography>
      <hr />
      <SubCategoryList />
    </>
  );
};

export default Home;
