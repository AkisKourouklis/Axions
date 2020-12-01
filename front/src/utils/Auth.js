import { axiosCallApi, publicApi } from '../config/api';

export const login = (data) => {
  return axiosCallApi
    .post(`${publicApi}/subscribers/login`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};

export const register = (data, router) => {
  return axiosCallApi
    .post(`${publicApi}/subscribers/register`, data)
    .then((response) => {
      return response.data;
    })
    .then(() => {
      axios.post(`${publicApi}/email/register`, data.email).then((res) => {
        console.log(res);
      });
      router.push('/authentication/login');
    })
    .catch((err) => {
      console.log(err);
    });
};
