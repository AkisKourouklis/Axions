import React, { useState } from 'react';
import Dashboard from '../Dashboard';
import { useRouter } from 'next/router';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Chat = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (values) => {
    console.log(values);
    router.push(`/dashboard/chat/room?name=${values.name}&room=${values.room}`);
  };

  return (
    <Dashboard>
      <Row className="mb-3">
        <Col>
          <h3>Συνομιλία</h3>
        </Col>
      </Row>
      <section>
        <Row className="mb-3">
          <Col>
            <h3>Chat</h3>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} id="chat-join-form">
              <Form.Group>
                <Form.Label>Ψευδώνυμο</Form.Label>
                <Form.Control ref={register()} name="name" placeholder="Όνομα" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Δωμάτιο</Form.Label>
                <Form.Control
                  ref={register()}
                  name="room"
                  placeholder="Δώσε ένα όνομα στο δωμάτιο"
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button type="submit" form="chat-join-form">
              Σύνδεση
            </Button>
          </Card.Footer>
        </Card>
      </section>
    </Dashboard>
  );
};

export default Chat;
