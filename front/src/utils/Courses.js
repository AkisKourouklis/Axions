import { publicApi, axiosCallApi } from '../config/api';

export const fetchCourses = (filter) => {
  return axiosCallApi
    .get(`${publicApi}/courses/all/client?filter=${filter}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => {
      return response.data.courses;
    });
};

export const fetchSingle = (id) => {
  return axiosCallApi
    .get(`${publicApi}/courses/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then((response) => {
      return response.data.course;
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};

export const fetchOnwedCourses = (id) => {
  return axiosCallApi
    .get(`${publicApi}/subscribers/client/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    })
    .then((response) => {
      return axiosCallApi
        .post(
          `${publicApi}/courses/courses/client`,
          { courses: response.data.courses },
          { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } }
        )
        .then((doc) => {
          return doc.data;
        })
        .catch((err) => {
          console.log(err);
          return 'error';
        });
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};
