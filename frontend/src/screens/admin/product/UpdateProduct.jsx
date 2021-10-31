import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { getSingleProduct, updateProduct } from "../../../functions/product";
import {
  getAllCategories,
  getAllChildSubCategories,
} from "../../../functions/category";
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
const UpdateProduct = ({ history, match }) => {
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
    "Redmi",
    "OnePlus",
    "OPPO",
    "Vivo",
  ];
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [listOfSubCategories, setListOfSubCategories] = useState([]);
  const [arrayOfSubIDs, setArrayOfSubIDs] = useState([]);
  const [cateId, setCateId] = useState("");
  const { slug } = match.params;
  const [values, setValues] = useState(initialState);
  const loadSingleProduct = useCallback(() => {
    getSingleProduct(slug)
      .then((res) => {
        setValues({ ...values, ...res.data });
        getAllChildSubCategories(res.data.category._id)
          .then((res) => {
            setListOfSubCategories(res.data);
          })
          .catch((err) => {
            if (err.response.data.err)
              toast.error(
                err.response.data.err,
                "subcategories weren't loaded"
              );
          });
        let arr = [];
        res.data.subCategories.map((sub) => arr.push(sub._id));
        setArrayOfSubIDs((prev) => arr);
        setCateId(res.data.category._id);
      })
      .catch((err) => {
        console.log("ERROR IN PRODUCT UPDATION API CALL", err);
        toast.error(err);
      });
  }, [slug, values]);
  const loadCategories = useCallback(() => {
    getAllCategories().then((c) => setListOfCategories(c.data));
  }, []);
  useEffect(() => {
    loadSingleProduct();
    loadCategories();
  }, [loadSingleProduct, loadCategories]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.info(`${res.data.title} successfully updated`);
        setValues(initialState);
        history.push("/admin/manage-product");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleCategoryChange = (categoryID) => {
    setValues({ ...values, category: categoryID });
    getAllChildSubCategories(categoryID)
      .then((res) => {
        setArrayOfSubIDs([]);
        setListOfSubCategories(res.data);
      })
      .catch((err) => {
        if (err.response.data.err)
          toast.error(err.response.data.err, "subcategories weren't loaded");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <div className="container text-center">
              <Spin spinning={loading} size="large" tip="Loading..." />
            </div>
          ) : (
            <ProductUpdateForm
              heading="Update Product"
              handleSubmit={handleSubmitForm}
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
              arrayOfSubIDs={arrayOfSubIDs}
              setArrayOfSubIDs={setArrayOfSubIDs}
              cateId={cateId}
              setCateId={setCateId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
