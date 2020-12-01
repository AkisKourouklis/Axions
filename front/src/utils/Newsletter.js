import { axiosCallApi, publicApi } from '../config/api';

export const postNewsletter = (email) => {
  return axiosCallApi
    .post(
      `${publicApi}/email/newsletter`,
      { email },
      {
        headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    .then(() => {
      return 'success';
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
