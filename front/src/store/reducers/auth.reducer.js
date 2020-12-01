import update from 'immutability-helper';
import types from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: '',
  email: '',
  token: '',
  courses: [],
  id: '',
  isError: false
};

const authError = (state) => {
  return update(state, {
    isLoading: { $set: false },
    isError: { $set: true }
  });
};
const authStart = (state) => {
  return update(state, {
    isLoading: { $set: true },
    isError: { $set: false }
  });
};
const authSuccess = (state, action) => {
  return update(state, {
    isLoading: { $set: false },
    isAuthenticated: { $set: true },
    user: { $set: action.token.name },
    token: { $set: action.token.token },
    email: { $set: action.token.email },
    courses: { $set: action.courses },
    id: { $set: action.id }
  });
};
const authLogout = (state) => {
  return update(state, {
    isLoading: { $set: false },
    isAuthenticated: { $set: false },
    user: { $set: '' },
    email: { $set: '' },
    token: { $set: '' },
    courses: { $set: [] },
    id: { $set: '' },
    ownedCourses: { $set: [] }
  });
};

const addNewCourse = (state, action) => {
  console.log('HERE', action.course);
  return update(state, {
    course: { $push: [action.course] }
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
    case types.AUTH_PUSH_NEW_COURSE:
      return addNewCourse(state, action);
    default:
      return state;
  }
};
export default reducer;
