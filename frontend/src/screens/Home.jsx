import React, { useState } from "react";
import { Spin } from "antd";
import Jumbotron from "../components/cards/Jumbotron";
import LatestProducts from "./home/LatestProducts";
import BestSellers from "./home/BestSellers";
import { Typography } from "@material-ui/core";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subcategory/SubCategoryList";
import LoadingCard from "../components/cards/LoadingCard";
//import { useSelector } from "react-redux";
const Home = ({ history }) => {
  const [loading, setLoading] = useState(false);
  //const { user } = useSelector((state) => ({ ...state }));
  // useEffect(() => {
  //   let intended = history.location.state;
  //   if (!intended && user && user.token) {
  //     history.push("/");
  //   }
  // }, [user, history]);
  return (
    <>
      {loading ? (
        <>
          <div className="container text-center m-4">
            <Spin spinning={loading} size="large" tip="Loading..." />
          </div>
          <LoadingCard quantity={6} />
        </>
      ) : (
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
      )}
    </>
  );
};

export default Home;
