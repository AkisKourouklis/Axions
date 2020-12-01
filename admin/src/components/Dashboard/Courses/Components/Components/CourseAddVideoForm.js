import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CourseAddVideoForm = ({ onSubmitVideoEdit, data }) => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmitVideoEdit)}
        id={`addVideoCourse-editVideo-form-${data._id}`}
        className="p-2"
      >
        {/* Τίτλος βίντεο */}
        <Form.Group>
          <Form.Label>Τίτλος βίντεο</Form.Label>
          <Form.Control
            type="text"
            name="title"
            ref={register()}
            placeholder="Τίτλος βίντεο"
            defaultValue={data?.title}
          />
        </Form.Group>
        {/* Περιγραφή βίντεο */}
        <Form.Group>
          <Form.Label>Περιγραφή βίντεο</Form.Label>

          <Form.Control
            type="text"
            name="description"
            ref={register()}
            defaultValue={data?.description}
            placeholder="Περιγραφή βίντεο"
          />
        </Form.Group>
        {/* Εμφάνιση στην ιστοσελίδα */}
        <Form.Group>
          <Form.Label>Εμφάνιση στην ιστοσελίδα</Form.Label>
          <Form.Control
            as="select"
            type="text"
            name="isIntro"
            ref={register()}
            defaultValue={data?.isIntro}
            placeholder="Εμφάνιση στην ιστοσελίδα"
          >
            <option value="true">Ναί</option>
            <option value="false">Όχι</option>
          </Form.Control>
        </Form.Group>
        {/* Μπορεί να παίξει στην ιστοσελίδα */}
        <Form.Group>
          <Form.Label>Μπορεί να παίξει στην ιστοσελίδα</Form.Label>
          <Form.Control
            as="select"
            type="text"
            name="isPreviable"
            ref={register()}
            defaultValue={data?.isPreviable}
            placeholder="Μπορεί να παίξει στην ιστοσελίδα"
          >
            <option value="true">Ναί</option>
            <option value="false">Όχι</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" form={`addVideoCourse-editVideo-form-${data._id}`}>
          Αποθήκευση
        </Button>
      </Form>
    </>
  );
};

export default CourseAddVideoForm;
