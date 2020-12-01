import { publicApi, axiosCallApi } from '../config/api';

export const fetchProducts = (filter) => {
  return axiosCallApi
    .get(`${publicApi}/products/all?filter=${filter}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => {
      return response.data.products;
    });
};

export const fetchSingle = (id) => {
  return axiosCallApi
    .get(`${publicApi}/products/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then((response) => {
      return response.data.product;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
