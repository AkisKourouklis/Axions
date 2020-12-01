import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../../../../config/api';

const CourseEdit = ({ id, submit }) => {
  const [course, setCourse] = useState();
  const { register, handleSubmit } = useForm();
  const [validImage, setvalidImage] = useState(false);
  const [validVideo, setvalidVideo] = useState(false);

  const onSubmit = (values) => {
    submit(values);
  };

  const toggleValid = () => {
    setvalidImage(true);
  };
  const toggleValidVideo = () => {
    setvalidVideo(true);
  };

  const fetchCourse = () => {
    axios
      .get(`${apiUrl}/courses/${id}`)
      .then((response) => {
        setCourse(response.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="editCourse-form">
        {/* GROUP 1 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Όνομα</Form.Label>
            <Form.Control
              ref={register()}
              defaultValue={course?.name}
              type="text"
              placeholder="Όνομα μαθήματος"
              name="name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Τιμή</Form.Label>
            <Form.Control
              ref={register()}
              defaultValue={course?.price}
              type="number"
              placeholder="Τιμή Μαθήματος"
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
              defaultValue={course?.description}
              placeholder="Περιγραφή μαθήματος"
              name="description"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Ορατότητα</Form.Label>
            <Form.Control
              as="select"
              ref={register()}
              placeholder="Τιμή Μαθήματος"
              defaultValue={course?.visible}
              name="visible"
            >
              <option value="true">ΝΑΙ</option>
              <option value="false">OXI</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        {/* GROUP 3 */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 1ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option1"
              defaultValue={course?.options[0]?.name}
              type="text"
              placeholder="Χαρακτηριστικό 1"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 2ο</Form.Label>
            <Form.Control
              ref={register()}
              name="option2"
              defaultValue={course?.options[1]?.name}
              type="text"
              placeholder="Χαρακτηριστικό 2"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 3ο</Form.Label>
            <Form.Control
              ref={register()}
              defaultValue={course?.options[2]?.name}
              name="option3"
              type="text"
              placeholder="Χαρακτηριστικό 3"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Χαρακτηριστικό 4ο</Form.Label>
            <Form.Control
              ref={register()}
              defaultValue={course?.options[3]?.name}
              name="option4"
              type="text"
              placeholder="Χαρακτηριστικό 4"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Χαρακτηριστικό 5ο</Form.Label>
          <Form.Control
            ref={register()}
            defaultValue={course?.options[4]?.name}
            name="option5"
            type="text"
            placeholder="Χαρακτηριστικό 5"
          />
        </Form.Group>
        {/* Εικόνα */}
        <Form.Group>
          <Form.Label>Εικόνα url</Form.Label>
          <Form.Control
            ref={register()}
            type="text"
            placeholder="Εικόνα"
            defaultValue={course?.image}
            disabled
            name="imageUrl"
          />
        </Form.Group>
        {/* GROUP 4 */}
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
    </>
  );
};

export default CourseEdit;
