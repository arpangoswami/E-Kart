import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { Menu, Slider } from "antd";
import ProductCard from "../../components/cards/ProductCard";
import { DollarCircleOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 50000]);
  const [ok, setOk] = useState(false);
  let dispatcher = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));

  let { text } = search;
  useEffect(() => {
    if (!text) {
      loadProducts();
    }
  }, [text]);
  const loadProducts = () => {
    setLoading(true);
    getProductsByCount(12)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };
  const handleAddtoCart = (slug) => {};
  const handleSlider = (value) => {
    setPrice(value);
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 600);
    return () => clearTimeout(delayed);
  }, [text]);
  //3. load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(`${err} happened while fetching products`));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-3"
          style={{ backgroundColor: "white", height: "auto" }}
        >
          <Typography
            variant="h5"
            color="primary"
            fontFamily="Quicksand"
            className="text-center pt-5"
          >
            Search/Filter Menu
          </Typography>
          <hr />
          <Menu mode="inline">
            <SubMenu
              key="1"
              title={
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    className="h6"
                  >
                    {/* <AttachMoneyIcon /> */}
                    <DollarCircleOutlined />
                    <span>Price</span>
                  </div>
                </>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `₹${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={95000}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : products.length > 0 ? (
            <>
              <Typography
                variant="h3"
                color="primary"
                fontFamily="Quicksand"
                className="text-center pt-5"
              >
                Products
              </Typography>
              <hr />
              <div className="row">
                {products.map((p) => (
                  <div key={p._id} className="col-md-4">
                    <ProductCard
                      product={p}
                      handleAddtoCart={(e) => {
                        e.preventDefault();
                        handleAddtoCart(p.slug);
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <Typography
                variant="h3"
                color="primary"
                fontFamily="Quicksand"
                className="text-center pt-5"
              >
                No Products Found
              </Typography>
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
