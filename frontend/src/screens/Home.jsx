import React, { useState } from "react";
import { Spin } from "antd";
import Jumbotron from "../components/cards/Jumbotron";
import LatestProducts from "./home/LatestProducts";
import BestSellers from "./home/BestSellers";
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
  const handleAddtoCart = (slug) => {};
  return (
    <>
      {loading ? (
        <div className="container text-center m-4">
          <Spin spinning={loading} size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <div className="jumbotron h1 text-center font-weight-bold text-danger">
            <Jumbotron
              text={["Best Prices", "Original Products", "Latest Products"]}
            />
          </div>
          <LatestProducts
            handleAddtoCart={handleAddtoCart}
            setLoading={setLoading}
            loading={loading}
          />
          <BestSellers
            handleAddtoCart={handleAddtoCart}
            setLoading={setLoading}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default Home;
