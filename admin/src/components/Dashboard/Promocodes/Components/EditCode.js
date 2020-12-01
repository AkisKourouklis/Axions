import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col } from 'react-bootstrap';
import { apiUrl } from '../../../../config/api';
import axios from 'axios';

const CourseAdd = ({ onSubmit, id }) => {
  const { register, handleSubmit } = useForm();
  const [courses, setCourses] = useState();
  const [code, setCode] = useState();

  const fetchCourses = () => {
    axios
      .get(`${apiUrl}/courses/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCourses(response.data.courses);
      });
  };

  const fetchPromoCodes = () => {
    axios
      .get(`${apiUrl}/promoCodes/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        console.log(response.data);
        setCode(response.data.promoCode);
      });
  };

  useEffect(() => {
    fetchCourses();
    fetchPromoCodes();
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="editCode-form">
        {/* GROUP 1 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Όνομα</Form.Label>
            <Form.Control
              ref={register()}
              type="text"
              placeholder="Όνομα μαθήματος"
              name="name"
              defaultValue={code?.name}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Τιμή</Form.Label>
            <Form.Control
              defaultValue={code?.value}
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
              defaultValue={code?.isPercentage}
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
              defaultValue={code?.appliesOn}
            >
              {courses?.map((data) => {
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
