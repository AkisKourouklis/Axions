import type from './types';

const notificationInit = (message, notificationType) => ({
  type: type.NOTIFICATION_INIT,
  message,
  notificationType
});

const notificationClose = () => ({
  type: type.NOTIFICATION_CLOSE
});

export const notificationAction = (message, notificationType) => {
  return (dispatch) => {
    dispatch(notificationInit(message, notificationType));
  };
};

export const notificationCloseAction = () => {
  return (dispatch) => {
    dispatch(notificationClose());
  };
};
