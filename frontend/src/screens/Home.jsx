import React, { useState, lazy } from "react";
import { Typography } from "@material-ui/core";
const Jumbotron = lazy(() => import("../components/cards/Jumbotron"));
const LatestProducts = lazy(() => import("./home/LatestProducts"));
const BestSellers = lazy(() => import("./home/BestSellers"));
const CategoryList = lazy(() => import("../components/category/CategoryList"));
const SubCategoryList = lazy(() =>
  import("../components/subcategory/SubCategoryList")
);
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
