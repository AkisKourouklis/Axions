import { axiosCallApi, publicApi } from '../config/api';

export const fetchConfig = () => {
  return axiosCallApi
    .get(`${publicApi}/config/all/client`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchLogo = (file) => {
  return axiosCallApi.post(`${publicApi}/courses/s3/single`, { file }).then((doc) => {
    return doc.data;
  });
};
