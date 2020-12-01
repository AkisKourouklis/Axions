import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Images from '../../Shared/Images/Images';
import { Form, Col, Card, Button, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { apiUrl } from '../../../../config/api';
import { MdDelete } from 'react-icons/md';

const CourseEdit = ({ id, submit }) => {
  const [category, setCategory] = useState();
  const [option, setOption] = useState();
  const [validImage, setvalidImage] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    submit(values);
  };

  const toggleValid = () => {
    setvalidImage(true);
  };

  const fetchCategory = () => {
    axios
      .get(`${apiUrl}/categories/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addOption = () => {
    axios
      .patch(
        `${apiUrl}/categories/option/${id}`,
        { option },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        fetchCategory();
      });
  };

  const removeOption = (_id) => {
    axios
      .patch(
        `${apiUrl}/categories/option/remove/${id}`,
        { _id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    fetchCategory();
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
              defaultValue={category?.name}
              type="text"
              placeholder="Όνομα μαθήματος"
              name="name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Επιλογή</Form.Label>
            <Row>
              <Col xs="8" md="10" className="pr-0">
                <Form.Control
                  onChange={handleOption}
                  type="text"
                  placeholder="Όνομα επιλογής"
                  name="option"
                />
              </Col>
              <Col xs="4" md="2" className="pl-1 pr-0">
                <Button type="button" onClick={addOption}>
                  <FiPlus className="text-light" />
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form.Row>
        {category?.options?.map((data) => {
          return (
            <Card className="mb-1" key={data._id}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                {data.name}
                <Button variant="danger" onClick={() => removeOption(data._id)}>
                  <MdDelete />
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        {/* GROUP 4 */}
        <Form.Group className="mt-3">
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
        <Row>
          {category?.images?.map((data) => {
            return (
              <Col xs="6" lg="3" key={data._id}>
                <Images
                  type="categories"
                  id={id}
                  file={data.key}
                  fetchProduct={fetchCategory}
                />
              </Col>
            );
          })}
        </Row>
      </Form>
    </>
  );
};

export default CourseEdit;
