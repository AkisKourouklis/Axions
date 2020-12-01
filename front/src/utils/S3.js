import { axiosCallApi, publicApi } from '../config/api';

export const fetchSingle = (file) => {
  return axiosCallApi
    .post(`${publicApi}/courses/s3/single`, { file })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
