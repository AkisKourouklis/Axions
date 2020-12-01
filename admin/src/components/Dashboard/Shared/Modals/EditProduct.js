import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Images from '../Images/Images';
import {
  Form,
  Col,
  Row,
  Button,
  Card,
  Modal,
  Tabs,
  Tab,
  Accordion,
  Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../../../../config/api';
import { MdDelete } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import AddOptionValueCard from './Components/AddOptionValueCard';

const EditProduct = ({ showEdit, hideEdit, submit, loading, id }) => {
  const { register, handleSubmit } = useForm();
  const [product, setProduct] = useState();
  const [validImage, setvalidImage] = useState(false);
  const [tag, setTag] = useState('product');
  const [filters, setFilters] = useState();
  const [optionId, setOptionId] = useState();

  const onSubmit = (values) => {
    submit(values);
  };

  const toggleValid = () => {
    setvalidImage(true);
  };

  const fetchProduct = () => {
    if (id) {
      axios
        .get(`${apiUrl}/products/${id}`)
        .then((response) => {
          setProduct(response.data.product);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchFilters = () => {
    axios
      .get(`${apiUrl}/filters/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setFilters(response.data.filters);
      });
  };

  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const addTag = () => {
    axios
      .post(
        `${apiUrl}/products/tag/${product._id}`,
        { tag },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTag = (id) => {
    axios
      .post(
        `${apiUrl}/products/tag/remove/${id}`,
        { id: product._id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchProduct();
      });
  };

  const newOption = (values) => {
    axios
      .patch(
        `${apiUrl}/products/option/${id}`,
        { name: values.name },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        console.log(response.data);
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeOption = (_id) => {
    axios
      .patch(
        `${apiUrl}/products/option/remove/${_id}`,
        { id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        console.log(response.data);
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newOptionValue = (values) => {
    if (optionId) {
      axios
        .patch(
          `${apiUrl}/products/option/values/${id}`,
          { name: values.name, id: optionId, stock: values.stock },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          fetchProduct();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeOptionValue = (_id, id2) => {
    axios
      .patch(
        `${apiUrl}/products/option/values/remove/${id}`,
        { id: id2, _id: _id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
    fetchFilters();
  }, [id]);

  return (
    <>
      <Modal show={showEdit} onHide={hideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Επεξεργασία προιόντος</h5>
          </Modal.Title>
        </Modal.Header>
        {product ? (
          <>
            <Modal.Body>
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Ρυθμίσεις">
                  <Form onSubmit={handleSubmit(onSubmit)} id="editCourse-form">
                    {/* GROUP 1 */}
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Τίτλος</Form.Label>
                        <Form.Control
                          ref={register()}
                          defaultValue={product?.title}
                          type="text"
                          placeholder="Όνομα μαθήματος"
                          name="title"
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Τιμή</Form.Label>
                        <Form.Control
                          ref={register()}
                          defaultValue={product?.price}
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
                          defaultValue={product?.description}
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
                          defaultValue={product?.visible}
                          name="visible"
                        >
                          <option value="true">ΝΑΙ</option>
                          <option value="false">OXI</option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    {/* GROUp 3 */}
                    <Form.Group>
                      <Form.Label>Απόθεμα</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Απόθεμα"
                        name="stock"
                        ref={register()}
                        defaultValue={product?.stock}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Επιλογή</Form.Label>
                      <Row>
                        <Col xs="9" md="10" className="pr-0">
                          <Form.Control
                            onChange={onChangeTag}
                            as="select"
                            name="tag"
                            defaultValue="product"
                            placeholder="Όνομα επιλογής"
                          >
                            {filters?.map((data) =>
                              data.options.map((res) => {
                                return (
                                  <option value={res.name} key={res._id}>
                                    {data.name} - {res.name}
                                  </option>
                                );
                              })
                            )}
                          </Form.Control>
                        </Col>
                        <Col xs="3" md="2">
                          <Button className="btn-block" onClick={addTag}>
                            <FiPlus className="text-light" />
                          </Button>
                        </Col>
                      </Row>
                      <Form.Label>Επιλογές</Form.Label>
                      <Row>
                        {product?.tags?.map((data) => {
                          return (
                            <Col xs="6" key={data._id}>
                              <Card className="mb-1">
                                <Card.Body>
                                  <Row className="justify-content-between">
                                    <Col className="d-flex align-items-center">
                                      {data.name}
                                    </Col>
                                    <Col className="text-right">
                                      <Button
                                        onClick={() => removeTag(data._id)}
                                        variant="danger"
                                        type="button"
                                      >
                                        <MdDelete />
                                      </Button>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
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
                      {validImage ? (
                        <p style={{ color: '#28a745' }}>Image uploaded!</p>
                      ) : null}
                    </Form.Group>
                    <Row>
                      {product?.images?.map((data) => {
                        return (
                          <Col xs="6" lg="3" key={data._id}>
                            <Images
                              type="products"
                              id={id}
                              file={data.key}
                              fetchProduct={fetchProduct}
                            />
                          </Col>
                        );
                      })}
                    </Row>
                  </Form>
                </Tab>
                <Tab eventKey="profile" title="Χαρακτηριστικά">
                  <Accordion>
                    <Accordion.Toggle
                      as={Button}
                      className="w-100 p-0"
                      variant="link"
                      eventKey="0"
                    >
                      <span type="button" className="mt-1 btn btn-secondary btn-block">
                        Προσθήκη
                      </span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card>
                        <Card.Body>
                          <Form onSubmit={handleSubmit(newOption)}>
                            <Form.Group>
                              <Form.Label>Όνομα</Form.Label>
                              <Form.Control
                                ref={register()}
                                type="text"
                                name="name"
                                placeholder="Όνομα"
                              />
                            </Form.Group>
                            <Button type="submit" variant="secondary">
                              Αποθήκευση
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Accordion.Collapse>
                  </Accordion>
                  {product?.options.map((data) => {
                    return (
                      <div key={data._id}>
                        <AddOptionValueCard
                          data={data}
                          removeOption={removeOption}
                          setOptionId={setOptionId}
                          newOptionValue={newOptionValue}
                          removeOptionValue={removeOptionValue}
                        />
                      </div>
                    );
                  })}
                </Tab>
              </Tabs>
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
                {loading ? <>Περιμένετε</> : <>Αποθήκευση μαθήματος</>}
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <div
            style={{ height: '100vh' }}
            className="d-flex justify-content-center align-items-center bg-dark"
          >
            <Spinner className="mb-1" animation="border" size="lg" variant="light" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default React.memo(EditProduct);
