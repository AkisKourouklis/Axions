import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../../../../../config/api';

const EditClient = ({ id }) => {
  const [courses, setCourses] = useState();
  const [userCourses, setUserCourses] = useState();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    axios
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
    axios
      .get(`${apiUrl}/subscribers/${id}`, {
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
    axios
      .post(
        `${apiUrl}/subscribers/addCourse`,
        { id, course: values.course },
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
    axios
      .post(
        `${apiUrl}/subscribers/removeCourse`,
        { id, course: _id },
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
    fetchUserCourses();
  }, [id]);

  return (
    <>
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
    </>
  );
};

export default EditClient;
