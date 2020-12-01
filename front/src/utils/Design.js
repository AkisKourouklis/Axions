import { axiosCallApi, publicApi } from '../config/api';

export const fetchNavbarDesign = () => {
  return axiosCallApi
    .get(`${publicApi}/design/`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
