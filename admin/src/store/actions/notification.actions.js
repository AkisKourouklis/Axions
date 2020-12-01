import actionTypes from './types';

const notification = (notificationType, message) => ({
  type: actionTypes.NOTIFICATION,
  notificationType,
  message
});

const hide = () => ({
  type: actionTypes.NOTIFICATION_HIDE
});

export const hideNotification = () => {
  return (dispatch) => {
    dispatch(hide());
  };
};

export const showNotification = (notificationType, message) => {
  return (dispatch) => {
    dispatch(notification(notificationType, message));
    setTimeout(() => {
      dispatch(hide());
    }, 5500);
  };
};
