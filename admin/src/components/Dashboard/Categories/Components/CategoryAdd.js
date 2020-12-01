import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

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
        <Form.Group>
          <Form.Label>Όνομα</Form.Label>
          <Form.Control
            ref={register()}
            type="text"
            placeholder="Όνομα κατηγορίας"
            name="name"
          />
        </Form.Group>
        {/* GROUP 4 */}
        <Form.Group className="mt-3">
          <Form.Label>Εικόνα</Form.Label>
          <Form.File
            id="custom-file"
            label="Διάλεξε μία εικόνα"
            custom
            isValid={validImage}
            onChange={toggleValid}
            ref={register()}
            name="image"
            required
          />
          {validImage ? <p style={{ color: '#28a745' }}>Image uploaded!</p> : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default CourseAdd;
