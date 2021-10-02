import axios from "axios";

export const getAllCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const updateCategory = async (slug, category, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/category/update/${slug}`,
    category,
    {
      headers: {
        authToken,
      },
    }
  );

export const deleteCategory = async (slug, authToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/category/delete/${slug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const createCategory = async (category, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-category`,
    category,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getAllChildSubCategories = (_id) =>
  axios.get(
    `${process.env.REACT_APP_API}/category/child-sub-categories/${_id}`
  );
