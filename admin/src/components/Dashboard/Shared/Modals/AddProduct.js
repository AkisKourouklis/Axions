import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Modal, Button } from 'react-bootstrap';

const AddProduct = ({ submit, show, handleShow, loading }) => {
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
      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Προσθήκη νέου προιόντος</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="addCourse-form">
            {/* GROUP 1 */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Τίτλος</Form.Label>
                <Form.Control
                  ref={register()}
                  type="text"
                  placeholder="Όνομα προιόντος"
                  name="title"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Τιμή</Form.Label>
                <Form.Control
                  ref={register()}
                  type="number"
                  placeholder="Τιμή προιόντος"
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
                  placeholder="Περιγραφή προιόντος"
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

            {/* GROUP 4 */}
            <Form.Group>
              <Form.Label>Απόθεμα</Form.Label>
              <Form.Control
                ref={register()}
                type="number"
                placeholder="Απόθεμα"
                name="stock"
              />
            </Form.Group>
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
            {loading ? <>Περιμένετε</> : <>Δημιουργία νέου προιόντος</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(AddProduct);
