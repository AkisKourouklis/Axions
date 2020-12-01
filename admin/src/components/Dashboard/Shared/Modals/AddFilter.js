import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Modal, Button } from 'react-bootstrap';

const AddFilter = ({ show, handleShow, loading, submit }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    submit(values);
  };

  return (
    <>
      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Προσθήκη νέου φίλτρου</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="addCourse-form">
            {/* GROUP 1 */}
            <Form.Group>
              <Form.Label>Όνομα</Form.Label>
              <Form.Control
                ref={register()}
                type="text"
                placeholder="Όνομα φίλτρου"
                name="name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Έξοδος
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="addCourse-form"
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Δημιουργία νέου φίλτρου</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddFilter;
