import update from 'immutability-helper';
import actionTypes from '../actions/types';

const initialState = {
  notification: {
    type: '',
    message: '',
    isVisible: false
  },
  notificationList: []
};

const notification = (state, action) => {
  return update(state, {
    notification: {
      type: { $set: action.notificationType },
      message: { $set: action.message },
      isVisible: { $set: true }
    }
  });
};

const hide = (state) => {
  return update(state, {
    notification: {
      isVisible: { $set: false }
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATION:
      return notification(state, action);
    case actionTypes.NOTIFICATION_HIDE:
      return hide(state);
    default:
      return state;
  }
};

export default reducer;
