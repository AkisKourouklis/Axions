import { axiosCallApi, apiUrl } from '../config/api';

export const login = (data) => {
  return axiosCallApi
    .post(`${apiUrl}/users/login`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
