import update from 'immutability-helper';
import types from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: '',
  email: '',
  token: ''
};

const authError = (state) => {
  return update(state, {
    isLoading: { $set: false }
  });
};
const authStart = (state) => {
  return update(state, {
    isLoading: { $set: true }
  });
};
const authSuccess = (state, action) => {
  return update(state, {
    isLoading: { $set: false },
    isAuthenticated: { $set: true },
    user: { $set: action.token.name },
    token: { $set: action.token.token },
    email: { $set: action.token.email }
  });
};
const authLogout = (state) => {
  return update(state, {
    isLoading: { $set: false },
    isAuthenticated: { $set: false },
    user: { $set: '' },
    email: { $set: '' },
    token: { $set: '' }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_FAIL:
      return authError(state);
    case types.AUTH_START:
      return authStart(state);
    case types.SET_CURRENT_USER:
      return authSuccess(state, action);
    case types.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};
export default reducer;
