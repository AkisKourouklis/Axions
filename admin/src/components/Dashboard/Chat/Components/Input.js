import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Input = ({ setMessage, sendMessage, message }) => (
  <Form>
    <Form.Control
      type="text"
      placeholder="Γράψε ένα μήνυμα..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <Button onClick={(e) => sendMessage(e)} block className="mt-1">
      Send
    </Button>
  </Form>
);

export default Input;
