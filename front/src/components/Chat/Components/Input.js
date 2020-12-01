import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Input = ({ setMessage, sendMessage, message }) => {
  const router = useRouter();

  const exitChat = () => {
    router.reload();
  };

  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Γράψε ένα μήνυμα..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <Row className="mt-1">
        <Col className="p-0 pr-1" xs="6">
          <Button onClick={(e) => sendMessage(e)} block>
            Αποστολή
          </Button>
        </Col>
        <Col className="p-0 pr-1" xs="6">
          <Button onClick={exitChat} variant="danger" block>
            Έξοδος
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default Input;
