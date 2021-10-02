import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subCategory";
import { getAllCategories } from "../../../functions/category";
import SubCategoryForm from "../../../components/forms/SubCategoryForm";
import { Spin } from "antd";

const UpdateSubCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [listOfCategories, setListOfCategories] = useState([]);
  const [parentID, setParentID] = useState("");

  useEffect(() => {
    const loadCategories = () =>
      getAllCategories().then((c) => setListOfCategories(c.data));
    const loadSingleCategory = () => {
      getSubCategory(match.params.slug).then((res) => {
        setSubCategoryName(res.data.name);
        setParentID(res.data.parent);
      });
    };
    loadCategories();
    loadSingleCategory();
  }, [match.params.slug]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateSubCategory(
      match.params.slug,
      { name: subCategoryName },
      user.token
    )
      .then((res) => {
        setLoading(false);
        setSubCategoryName("");
        toast.info(`"${res.data.name}" has been successfully updated`);
        history.push("/admin/manage-subcategory");
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        if (err.response.status === 400) {
          toast.error(`THERE ${err.response.data}`);
        } else {
          toast.error(`HERE ${err}`);
        }
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
            <SubCategoryForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Update Sub-Category"
              title="Update Sub-Category Name"
              subCategoryName={subCategoryName}
              setSubCategoryName={setSubCategoryName}
              loading={loading}
              categoryList={listOfCategories}
              parentCategoryID={parentID}
              setParentCategoryID={setParentID}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateSubCategory;
