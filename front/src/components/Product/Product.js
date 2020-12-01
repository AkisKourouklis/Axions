import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { CheckoutContext, AuthContext } from '../../store/Context/Context';
import { discount } from '../../utils/Checkout';
import { fetchLogo } from '../../utils/Config';
import { fetchSingle } from '../../utils/Courses';
import { fetchSingle as fetchProduct } from '../../utils/Products';
import { useForm } from 'react-hook-form';
import Main from '../Main';
import PreviableVideos from './components/PreviableVideos';

const Course = () => {
  const router = useRouter();
  const { checkout, setCheckout } = useContext(CheckoutContext);
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState();
  const [image, setImage] = useState();
  const [alert, setAlert] = useState(false);
  const [_dicsountValue, setDiscount] = useState();

  const _checkout = async (values) => {
    const _discount = await discount(_dicsountValue, data);
    setCheckout((checkout) => [
      ...checkout,
      {
        product: data,
        discount: _discount?.promoCodePrice,
        options: values
      }
    ]);
    toggleAlert();
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const fetchStart = async () => {
    if (router.query?.type === 'product') {
      const response = await fetchProduct(router.query.id);
      setData(response);
      if (response?.images[0].key) {
        const responseImage = await fetchLogo(response?.images[0].key);
        setImage(responseImage);
      }
    } else {
      const response = await fetchSingle(router.query.id);
      const responseImage = await fetchLogo(response?.image);
      setData(response);
      setImage(responseImage);
    }
  };

  // toggle alertttttt
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  useEffect(() => {
    if (router.query.id) {
      fetchStart();
    }
  }, [router.query.id]);

  return (
    <Main>
      {data ? (
        <Container style={{ maxWidth: '1140px' }}>
          <section className="bg-light pt-5 pb-5">
            <Row>
              <Col xs={12} lg={6}>
                <div>{image ? <img alt="img" src={image} width="100%" /> : null}</div>
              </Col>
              <Col className="product-right-column mt-5" xs={12} lg={6}>
                {router.query?.type === 'product' ? (
                  <h3 className="bold">{data?.title}</h3>
                ) : (
                  <h3 className="bold">{data?.name}</h3>
                )}
                <p>{data.description}</p>
                <h3 className="mt-3 font-weight-bold">{data?.price}€</h3>
                <Form onSubmit={handleSubmit(_checkout)} id="product-form">
                  {data?.options?.map((data) => {
                    return (
                      <Form.Group key={data._id}>
                        <Form.Label>{data?.name}</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue={data.values[0]}
                          name={data.name}
                          ref={register()}
                        >
                          {data.values.map((doc) => {
                            return (
                              <option value={doc.name} key={doc._id}>
                                {doc.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    );
                  })}
                </Form>
                <Form.Group>
                  <Form.Control
                    onChange={handleDiscount}
                    type="text"
                    size="lg"
                    placeholder="Κωδικός Έκπτωσης"
                  />
                </Form.Group>
                <div style={{ marginTop: '20px' }}>
                  {auth ? (
                    <>
                      <Button
                        disabled={data?.stock < 1 ? true : false}
                        size="lg"
                        block
                        type="submit"
                        form="product-form"
                      >
                        {data?.stock < 1 ? 'Εκτός αποθέματος' : 'Προσθήκη στο καλάθι'}
                      </Button>
                    </>
                  ) : (
                    <Button href="/authentication/register" type="button" block>
                      Εγγραφή
                    </Button>
                  )}
                </div>
                {alert ? (
                  <Alert className="mt-1" variant="success">
                    Το προιόν προστέθηκε στο καλάθι με επιτυχία
                  </Alert>
                ) : null}
              </Col>
            </Row>
            {/* PREVIABLE VIDEOS */}
            {router.query?.type === 'product' ? null : <PreviableVideos data={data} />}
          </section>
        </Container>
      ) : (
        <div
          style={{ height: '100vh' }}
          className="d-flex justify-content-center align-items-center bg-dark"
        >
          <Spinner className="mb-1" animation="border" size="lg" variant="light" />
        </div>
      )}
    </Main>
  );
};

export default Course;
