import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { apiUrl, axiosCallApi } from '../../../../config/api';

const EditClient = ({ showEdit, clientId, toggleHideEdit }) => {
  const [courses, setCourses] = useState();
  const [userCourses, setUserCourses] = useState();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    axiosCallApi
      .get(`${apiUrl}/courses/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCourses(response.data.courses);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserCourses = () => {
    axiosCallApi
      .get(`${apiUrl}/subscribers/${clientId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        axios
          .post(
            `${apiUrl}/courses/courses`,
            { courses: response.data.courses },
            {
              headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            }
          )
          .then((doc) => {
            setUserCourses(doc.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (values) => {
    axiosCallApi
      .post(
        `${apiUrl}/subscribers/addCourse`,
        { id: clientId, course: values.course },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchUserCourses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCourse = (_id) => {
    axiosCallApi
      .post(
        `${apiUrl}/subscribers/removeCourse`,
        { id: clientId, course: _id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchUserCourses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
    if (clientId) {
      fetchUserCourses();
    }
  }, [clientId]);

  return (
    <Modal show={showEdit} onHide={toggleHideEdit} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Προσθήκη βίντεο</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs="12" xl="6">
            <Form onSubmit={handleSubmit(onSubmit)} id="addCourse-toUser-form">
              {loading ? (
                <Form.Control name="course" as="select" ref={register()}>
                  {courses?.map((data) => {
                    return (
                      <option value={data._id} key={data._id}>
                        {data.name}
                      </option>
                    );
                  })}
                </Form.Control>
              ) : (
                <Spinner className="mb-1" animation="border" size="sm" />
              )}
              <Button className="mt-1" block type="submit" form="addCourse-toUser-form">
                Προσθήκη μαθήματος
              </Button>
            </Form>
          </Col>
          <Col xs="12" xl="6">
            {userCourses?.map((data) => {
              return (
                <Card key={data._id} className="mb-1">
                  <Card.Body>
                    <Row className="justify-content-space-between align-items-center">
                      <Col>{data.name}</Col>
                      <Col className="justify-content-end d-flex">
                        <div className="hover mr-2">
                          <MdDelete
                            className="ml-auto text-danger"
                            style={{ fontSize: '21px' }}
                            onClick={() => removeCourse(data._id)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleHideEdit}>
          Έξοδος
        </Button>
        <Button variant="primary" type="submit" onClick={toggleHideEdit}>
          Αποθήκευση Χρήστη
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(EditClient);
