import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, axiosCallApi } from '../../../../config/api';

const Addpromocode = ({ showAdd, toggleHideAdd, onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const [codes, setCodes] = useState();

  const fetchCourses = () => {
    axiosCallApi
      .get(`${apiUrl}/courses/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCodes(response.data.courses);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <Modal show={showAdd} onHide={toggleHideAdd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Προσθήκη κωδικού</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="addCode-form">
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
                  type="text"
                  placeholder="Τιμή"
                  name="value"
                />
              </Form.Group>
            </Form.Row>
            {/* GROUP 2 */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Τις %</Form.Label>
                <Form.Control
                  as="select"
                  ref={register()}
                  placeholder="Τις %"
                  name="isPercentage"
                  defaultValue="true"
                >
                  <option value="true">ΝΑΙ</option>
                  <option value="false">OXI</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Μαθήματα</Form.Label>
                <Form.Control
                  as="select"
                  ref={register()}
                  placeholder="Τις %"
                  name="appliesOn"
                >
                  {codes?.map((data) => {
                    return (
                      <option key={data._id} value={data._id}>
                        {data.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleHideAdd}>
            Έξοδος
          </Button>
          <Button variant="primary" type="submit" form="addCode-form">
            Αποθήκευση κωδικού
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Addpromocode);
