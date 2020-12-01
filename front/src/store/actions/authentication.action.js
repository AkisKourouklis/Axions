import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './types';
import { publicApi } from '../../config/api';

const authFail = (data) => ({
  type: types.AUTH_FAIL,
  data
});
const authStart = () => ({
  type: types.AUTH_START
});
const authLogout = () => ({
  type: types.AUTH_LOGOUT
});

const pushNewCourse = (course) => ({
  type: types.AUTH_PUSH_NEW_COURSE,
  course
});

export const addNewCourse = (course) => {
  return (dispatch) => {
    dispatch(pushNewCourse(course));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common.Authorization = '';
      localStorage.removeItem('jwtToken');
      dispatch(authLogout());
    } catch (err) {
      console.error(err);
    }
  };
};

export const setCurrentUser = (token, courses, id) => ({
  type: types.SET_CURRENT_USER,
  token,
  courses,
  id
});

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => {
  return async (dispatch) => {
    try {
      const fetchData = await axios.post(`${publicApi}/subscribers/login`, data);
      const { token, courses, id } = await fetchData.data;
      localStorage.setItem('jwtToken', token);
      dispatch(authStart());
      const details = { ...jwt.decode(token), token };
      dispatch(setCurrentUser(details, courses, id));
    } catch (err) {
      console.error(err);
      dispatch(authFail(err));
    }
  };
};

export const authregister = (data) => {
  return async (dispatch) => {
    await axios.post(`${publicApi}/subscribers/register`, {
      password: data.password,
      phone: data.phone,
      email: data.email.toLowerCase(),
      language: 'el',
      name: data.name
    });
    try {
      console.log('registed');
    } catch (err) {
      console.error(err);
      dispatch(authFail(err));
    }
  };
};
