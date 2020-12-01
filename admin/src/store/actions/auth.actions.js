import axios from 'axios';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import types from './types';
import { apiUrl } from '../../config/api';

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

export const logout = () => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common.Authorization = '';
      localStorage.removeItem('jwtToken');
      dispatch(authLogout());
      Router.push('/');
    } catch (err) {
      console.error(err);
    }
  };
};

export const setCurrentUser = (token) => ({
  type: types.SET_CURRENT_USER,
  token
});

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => {
  return async (dispatch) => {
    const fetchData = await axios.post(`${apiUrl}/users/login`, data);
    try {
      const { token } = await fetchData.data;
      localStorage.setItem('jwtToken', token);
      dispatch(authStart());
      const details = { ...jwt.decode(token), token };
      dispatch(setCurrentUser(details));
    } catch (err) {
      console.error(err);
      dispatch(authFail(err));
    }
  };
};
