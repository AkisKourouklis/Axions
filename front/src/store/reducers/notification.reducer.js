import update from 'immutability-helper';
import types from '../actions/types';

const initialState = {
  type: '',
  message: '',
  isShown: false
};

const notification = (state, action) => {
  return update(state, {
    type: { $set: action.notificationType },
    message: { $set: action.message },
    isShown: { $set: true }
  });
};

const notificationClose = (state) => {
  return update(state, {
    isShown: { $set: false }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case types.NOTIFICATION_INIT:
      return notification(state, action);
    case types.NOTIFICATION_CLOSE:
      return notificationClose(state);
    default:
      return state;
  }
};

export default reducer;
