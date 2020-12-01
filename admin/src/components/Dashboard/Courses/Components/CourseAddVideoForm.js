import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CourseAddVideoForm = ({ onSubmitVideoEdit, data, _loading }) => {
  const { register, handleSubmit } = useForm();

  const submit = (values) => {
    const id = data._id;

    onSubmitVideoEdit(values, id);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(submit)}
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
            <option value="true">Ναι</option>
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
            <option value="true">Ναι</option>
            <option value="false">Όχι</option>
          </Form.Control>
        </Form.Group>
        <Button
          disabled={_loading}
          type="submit"
          form={`addVideoCourse-editVideo-form-${data._id}`}
        >
          {_loading ? 'Περιμένετε' : 'Αποθήκευση'}
        </Button>
      </Form>
    </>
  );
};

export default CourseAddVideoForm;
