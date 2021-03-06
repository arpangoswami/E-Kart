import axios from "axios";

export const createProduct = async (product, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/create-product`, product, {
    headers: {
      authToken,
    },
  });
export const updateProduct = async (slug, product, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/update/${slug}`,
    product,
    {
      headers: {
        authToken,
      },
    }
  );
export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const deleteProduct = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-product/${slug}`, {
    headers: {
      authToken,
    },
  });

export const getSingleProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProductsSorted = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products/sort`, {
    sort,
    order,
    page,
  });

export const getTotalProductCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total-count`);

export const updateProductReview = async (id, star, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/add-rating/${id}`,
    { star },
    {
      headers: {
        authToken,
      },
    }
  );

export const getRelatedProducts = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filter`, arg);
