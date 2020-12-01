import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col } from 'react-bootstrap';
import { apiUrl } from '../../../../config/api';
import axios from 'axios';

const CourseAdd = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const [codes, setCodes] = useState();

  const fetchCourses = () => {
    axios
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
            <Form.Control ref={register()} type="text" placeholder="Τιμή" name="value" />
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
    </>
  );
};

export default CourseAdd;
