import React from 'react';
import { Alert as Notification } from 'react-bootstrap';

const Alert = ({ type, message, error }) => {
  return (
    <>
      {type === 'success' ? (
        <>
          <Notification variant="success" dismissible>
            {message}
          </Notification>
        </>
      ) : type === 'danger' ? (
        <>
          <Notification variant="danger" dismissible>
            <Notification.Heading>{message}</Notification.Heading>
            <p>{error}</p>
          </Notification>
        </>
      ) : (
        <>
          <Notification variant="success" dismissible>
            {message}
          </Notification>
        </>
      )}
    </>
  );
};

export default Alert;
