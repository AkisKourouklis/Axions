import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Figure } from 'react-bootstrap';

const CourseAdd = ({ submit }) => {
  const { register, handleSubmit } = useForm();
  const [validImage, setvalidImage] = useState(false);

  const onSubmit = (values) => {
    submit(values);
  };

  const toggleValid = () => {
    setvalidImage(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="addCourse-form">
        {/* GROUP 1 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Όνομα</Form.Label>
            <Form.Control
              ref={register()}
              type="text"
              placeholder="Όνομα μαθήματος"
              name="name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Τιμή</Form.Label>
            <Form.Control
              ref={register()}
              type="number"
              placeholder="Τιμή Μαθήματος"
              name="price"
            />
          </Form.Group>
        </Form.Row>
        {/* GROUP 2 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Περιγραφή</Form.Label>
            <Form.Control
              ref={register()}
              type="text"
              placeholder="Περιγραφή μαθήματος"
              name="description"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Ορατότητα</Form.Label>
            <Form.Control
              as="select"
              ref={register()}
              placeholder="Τιμή Μαθήματος"
              name="visible"
            >
              <option value="true">ΝΑΙ</option>
              <option value="false">OXI</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        {/* GROUP 3 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 1ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option1"
              type="text"
              placeholder="Χαρακτηριστικό 1"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 2ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option2"
              type="text"
              placeholder="Χαρακτηριστικό 2"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 3ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option3"
              type="text"
              placeholder="Χαρακτηριστικό 3"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 4ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option4"
              type="text"
              placeholder="Χαρακτηριστικό 4"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Χαρακτηριστικό 5ο</Form.Label>
          <Form.Control
            ref={register()}
            name="option5"
            type="text"
            placeholder="Χαρακτηριστικό 5"
          />
        </Form.Group>

        {/* GROUP 4 */}
        <Form.Group>
          <Form.Label>Εικόνα</Form.Label>
          <Form.File
            id="custom-file"
            label="Διάλεξε μία εικόνα"
            custom
            isValid={validImage}
            onChange={toggleValid}
            ref={register()}
            name="image"
          />
          {validImage ? <p style={{ color: '#28a745' }}>Image uploaded!</p> : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default CourseAdd;
