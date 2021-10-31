import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getAllCategories } from "../functions/category";
import { getAllSubCategories } from "../functions/subCategory";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { Menu, Slider, Checkbox, Radio } from "antd";
import ProductCard from "../components/cards/ProductCard";
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import Stars from "../components/forms/Stars";
const { SubMenu } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 99999]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [stars, setStars] = useState("");
  const [subCat, setSubs] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const [color, setColor] = useState("");
  const brands = [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
    "HP",
    "Panasonic",
    "Acer",
    "Dell",
    "MSI",
    "Redmi",
    "OnePlus",
    "OPPO",
    "Vivo",
  ];
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatcher = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));

  let { text } = search;
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Error fetching categories", err));
    getAllSubCategories()
      .then((res) => setSubCategories(res.data))
      .catch((err) =>
        console.log(`${err} happened while fetching subcategories`)
      );
  }, []);
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(`${err} happened while fetching products`));
  };
  useEffect(() => {
    if (!text) {
      loadProducts();
    }
  }, [text]);
  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 600);
    return () => clearTimeout(delayed);
  }, [text]);
  //3. load products based on price range
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price });
    }, 300);
    return () => clearTimeout(delayed);
  }, [ok, price]);
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
  const handleSlider = (value) => {
    setPrice(value);
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setTimeout(() => {
      setOk(!ok);
    }, 300);
    setStars("");
    setSubs("");
    setBrand("");
    setColor("");
    setShipping("");
    setCategoryIDs([]);
  };
  const handleCheckCategory = (e) => {
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 99999]);
    setCategoryIDs([]);
    setSubs("");
    setBrand("");
    setColor("");
    setShipping("");
    let alreadyChecked = [...categoryIDs];
    let justChecked = e.target.value;
    let present = alreadyChecked.indexOf(justChecked);
    if (present === -1) {
      alreadyChecked.push(justChecked);
    } else {
      alreadyChecked.splice(present, 1);
    }
    setCategoryIDs(alreadyChecked);
    if (alreadyChecked.length > 0) {
      fetchProducts({ category: alreadyChecked });
    } else {
      loadProducts();
    }
    setStars("");
  };
  const showCategories = categories.map((c) => (
    <div key={c._id}>
      <Checkbox
        onChange={handleCheckCategory}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIDs.includes(c._id)}
      >
        {c.name}
      </Checkbox>
      <br />
    </div>
  ));
  const handleStarClick = (num) => {
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 99999]);
    setCategoryIDs([]);
    setSubs("");
    setBrand("");
    setColor("");
    setShipping("");
    if (num === stars) {
      setStars("");
      loadProducts();
      return;
    }
    setStars(num);
    fetchProducts({ stars: num });
    if (!num) {
      loadProducts();
    }
  };

  const handleSub = (sub) => {
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setBrand("");
    setColor("");
    setShipping("");
    setPrice([0, 99999]);
    setCategoryIDs([]);
    setStars("");
    fetchProducts({ subCategory: subCat });
  };
  const showSubCategories = subCategories.map((s) => (
    <div
      key={s._id}
      onClick={() => handleSub(s)}
      className="p-1 m-1 badge badge-secondary"
      style={{ cursor: "pointer" }}
    >
      {s.name}
    </div>
  ));
  const showStars = (
    <div className="pb-2 pr-4 pl-4">
      <Stars starClick={handleStarClick} numberOfStars={5} />
      <Stars starClick={handleStarClick} numberOfStars={4} />
      <Stars starClick={handleStarClick} numberOfStars={3} />
      <Stars starClick={handleStarClick} numberOfStars={2} />
      <Stars starClick={handleStarClick} numberOfStars={1} />
    </div>
  );
  const handleBrand = (e) => {
    setSubs("");
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIDs([]);
    setStars("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };
  const showBrands = brands.map((b) => (
    <>
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
      <br />
    </>
  ));
  const handleColor = (e) => {
    setSubs("");
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIDs([]);
    setStars("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };
  const showColors = colors.map((c) => (
    <Radio
      value={c}
      name={c}
      checked={c === color}
      onChange={handleColor}
      className="pb-1 pl-4 pr-4"
    >
      {c}
    </Radio>
  ));
  const handleShippingchange = (e) => {
    setSubs("");
    dispatcher({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIDs([]);
    setStars("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };
  const showShipping = (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );
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
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
            {/* price */}
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
            {/* category */}
            <SubMenu
              key="2"
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
                    <DownSquareOutlined />
                    <span>Categories</span>
                  </div>
                </>
              }
            >
              {showCategories}
            </SubMenu>
            {/* ratings */}
            <SubMenu
              key="3"
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
                    <StarOutlined />
                    <span>Ratings</span>
                  </div>
                </>
              }
            >
              {showStars}
            </SubMenu>
            {/* subCategories */}
            <SubMenu
              key="4"
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
                    <TagsOutlined />
                    <span>Sub-Categories</span>
                  </div>
                </>
              }
            >
              {showSubCategories}
            </SubMenu>

            {/*Brands*/}
            <SubMenu
              key="5"
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
                    <DownSquareOutlined />
                    <span>Brands</span>
                  </div>
                </>
              }
            >
              {showBrands}
            </SubMenu>
            {/*Colors*/}
            <SubMenu
              key="6"
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
                    <DownSquareOutlined />
                    <span>Colors</span>
                  </div>
                </>
              }
            >
              {showColors}
            </SubMenu>
            {/*Shipping*/}
            <SubMenu
              key="7"
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
                    <DownSquareOutlined />
                    <span>Shipping</span>
                  </div>
                </>
              }
            >
              {showShipping}
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
                    <ProductCard product={p} />
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
