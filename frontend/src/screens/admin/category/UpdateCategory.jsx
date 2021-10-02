import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import { Spin } from "antd";

const UpdateCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const loadSingleCategory = () => {
      getCategory(match.params.slug).then((res) =>
        setCategoryName(res.data.name)
      );
    };
    loadSingleCategory();
  }, [match.params.slug]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateCategory(match.params.slug, { name: categoryName }, user.token)
      .then((res) => {
        setLoading(false);
        setCategoryName("");
        toast.info(`"${res.data.name}" has been successfully updated`);
        history.push("/admin/manage-category");
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
            <CategoryForm
              handleSubmitForm={handleSubmitForm}
              buttonText="Update Category"
              title="Update Category Name"
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateCategory;
