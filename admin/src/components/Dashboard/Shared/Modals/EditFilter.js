import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Images from '../../Shared/Images/Images';
import { Form, Col, Card, Button, Row, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { apiUrl } from '../../../../config/api';
import { MdDelete } from 'react-icons/md';

const EditFilter = ({ showEdit, hideEdit, filterId, submit, loading }) => {
  const [filter, setFilter] = useState();
  const [option, setOption] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    submit(values);
  };

  const fetchFilter = () => {
    axios
      .get(`${apiUrl}/filters/${filterId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setFilter(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addOption = () => {
    axios
      .patch(
        `${apiUrl}/filters/option/${filterId}`,
        { option },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchFilter();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeOption = (_id) => {
    axios
      .patch(
        `${apiUrl}/filters/option/remove/${filterId}`,
        { _id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchFilter();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    fetchFilter();
  }, [filterId]);

  return (
    <>
      <Modal show={showEdit} onHide={hideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Επεξεργασία φίλτρου</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="editCourse-form">
            {/* GROUP 1 */}
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Όνομα</Form.Label>
                <Form.Control
                  ref={register()}
                  defaultValue={filter?.name}
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
            {filter?.options?.map((data) => {
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
            <Row>
              {filter?.images?.map((data) => {
                return (
                  <Col xs="6" lg="3" key={data._id}>
                    <Images
                      type="categories"
                      id={id}
                      file={data.key}
                      fetchProduct={fetchfilters}
                    />
                  </Col>
                );
              })}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEdit}>
            Έξοδος
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="editCourse-form"
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Αποθήκευση φίλτρου</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditFilter;
