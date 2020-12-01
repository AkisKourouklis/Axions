import { axiosCallApi, publicApi } from '../config/api';

// fetch all categories
export const fetchCategories = (perPage) => {
  return axiosCallApi
    .get(`${publicApi}/categories/all?perPage=${perPage}`)
    .then((response) => {
      return response.data.categories;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};

// fetch category by name
export const fetchCategoryName = (name) => {
  return axiosCallApi
    .patch(`${publicApi}/categories/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
