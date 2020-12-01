import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Button, Card, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, axiosCallApi } from '../../../../config/api';
import { FiPlus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const Editpromocode = ({ showEdit, hideEdit, onSubmit, loading, id }) => {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState();
  const [courses, setCourses] = useState();
  const [code, setCode] = useState();
  const [applyType, setApplyType] = useState(false);

  const fetchCourses = () => {
    axiosCallApi
      .get(`${apiUrl}/courses/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCourses(response.data.courses);
      });
  };

  const fetchPromoCodes = () => {
    if (id) {
      axiosCallApi
        .get(`${apiUrl}/promoCodes/${id}`, {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        })
        .then((response) => {
          setCode(response.data.promoCode);
        });
    }
  };

  const fetchProducts = () => {
    axiosCallApi
      .get(`${apiUrl}/products/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setProducts(response.data.products);
      });
  };

  const handlePromoApply = (e) => {
    if (e.target.value === 'all') {
      setApplyType(false);
    } else {
      setApplyType(true);
    }
  };

  const submitValues = (values) => {
    if (values.applyonType === 'all') {
      axiosCallApi
        .post(
          `${apiUrl}/promoCodes/new/applyon/${id}`,
          {
            value: values.applyonType
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          fetchPromoCodes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    onSubmit(values);
  };

  const addApplyon = (values) => {
    axiosCallApi
      .post(
        `${apiUrl}/promoCodes/new/applyon/${id}`,
        {
          value: values.appliesOn
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchPromoCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeApplyon = (value) => {
    axiosCallApi
      .post(
        `${apiUrl}/promoCodes/remove/applyon/${id}`,
        {
          value
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchPromoCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
    fetchProducts();
    fetchPromoCodes();
  }, [id]);
  return (
    <>
      <Modal show={showEdit} onHide={hideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Επεξεργασία κωδικού έκπτωσης</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitValues)} id="editCode-form">
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
                <Form.Label>Τύπος</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handlePromoApply}
                  placeholder="Τις %"
                  defaultValue="all"
                  ref={register()}
                  name="applyonType"
                >
                  <option value="all">Όλα</option>
                  <option value="few">Μερικά</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
          {applyType ? (
            <Form onSubmit={handleSubmit(addApplyon)} id="addApplyon-form">
              <Form.Group>
                <Form.Label>Μαθήματα / Προιόντα</Form.Label>
                <Row>
                  <Col xs="8" md="10">
                    <Form.Control ref={register()} as="select" name="appliesOn">
                      {products?.map((data) => {
                        return <option key={data._id}>{data.title}</option>;
                      })}
                      {courses?.map((data) => {
                        return <option key={data._id}>{data.name}</option>;
                      })}
                    </Form.Control>
                  </Col>
                  <Col xs="4" md="2">
                    <Button
                      block
                      type="submit"
                      form="addApplyon-form"
                      variant="secondary"
                    >
                      <FiPlus />
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              {code?.appliesOn?.map((data, i) => {
                return (
                  <Card className="mt-1" key={i}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      {data}

                      <Button
                        onClick={() => removeApplyon(data)}
                        type="button"
                        variant="danger"
                      >
                        <MdDelete />
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </Form>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEdit}>
            Έξοδος
          </Button>
          <Button variant="primary" type="submit" form="editCode-form">
            {loading ? <>Περιμένετε</> : <>Αποθήκευση κωδικού</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Editpromocode);
