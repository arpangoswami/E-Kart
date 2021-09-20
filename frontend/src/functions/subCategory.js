import axios from "axios";

export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/sub-categories`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);

export const updateSubCategory = async (slug, subCategory, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/sub-category/update/${slug}`,
    subCategory,
    {
      headers: {
        authToken,
      },
    }
  );

export const deleteSubCategory = async (slug, authToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/sub-category/delete/${slug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const createSubCategory = async (subCategory, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-sub-category`,
    subCategory,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
