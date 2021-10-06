import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import {
  getAllCategories,
  getAllChildSubCategories,
} from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { Spin } from "antd";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  color: "",
  brand: "",
};
const CreateProduct = () => {
  const enumColors = ["Black", "Brown", "Silver", "White", "Blue"];
  const enumBrands = [
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
  ];
  const [values, setValues] = useState(initialState);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfSubCategories, setListOfSubCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        toast.info(`${res.data.title} successfully created`);
        setValues(initialState);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    setValues({ ...values, category: event.target.value });
    getAllChildSubCategories(event.target.value)
      .then((res) => {
        setListOfSubCategories(res.data);
      })
      .catch((err) => {
        if (err.response.data.err)
          toast.error(err.response.data.err, "subcategories weren't loaded");
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setListOfCategories(c.data));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <ProductCreateForm
              heading="Create New Product"
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              listOfCategories={listOfCategories}
              listOfSubCategories={listOfSubCategories}
              enumColors={enumColors}
              enumBrands={enumBrands}
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
