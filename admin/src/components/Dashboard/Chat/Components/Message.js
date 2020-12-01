import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Row className="mb-1">
      <Col className="text-right">
        <p>{trimmedName}</p>
        <div className="messageBox bg-primary">
          <p className="text-light">{text}</p>
        </div>
      </Col>
    </Row>
  ) : (
    <Row className="mb-1">
      <Col className="text-left">
        <p>{user}</p>
        <div className="messageBox bg-dark">
          <p className="text-light">{text}</p>
        </div>
      </Col>
    </Row>
  );
};

export default Message;
