import React, { useState } from 'react';
import { Row, Container, Button, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import { publicApi } from '../../config/api';
import CoProduct from './components/co-product';
import Main from '../Main';
import Paypal from '../Paypal/paypal';

const Checkout = () => {
  const product = useSelector((state) => state.checkout.product);
  const loading = useSelector((state) => state.checkout.loading);
  const id = useSelector((state) => state.auth.id);
  const [showPaypal, setShowPaypal] = useState(false);
  const router = useRouter();

  const showPaypalButton = () => {
    setShowPaypal(true);
  };

  const saveTransaction = () => {
    axios.post(
      `${publicApi}/transaction`,
      {
        value: product?.promoCodePrice ? product?.promoCodePrice : product?.price
      },
      {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }
    );
  };

  const addCourse = (details, data) => {
    axios
      .post(
        `${publicApi}/subscribers/addCourse/client`,
        { id, course: product },
        {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
        }
      )
      .then(() => {
        saveTransaction(details, data);
        router.push('/account/mycourses');
        setShowPaypal(false);
      });
  };

  const onSuccess = (details, data) => {
    addCourse(details, data);
  };

  const onError = () => {
    console.log('error');
  };

  return (
    <>
      {showPaypal ? (
        <div className="paypal-container">
          <Paypal
            onSuccess={onSuccess}
            onError={onError}
            ammount={product?.promoCodePrice ? product?.promoCodePrice : product?.price}
          />
        </div>
      ) : (
        <Main>
          <section className="bg-light pt-5 pb-5">
            <Container style={{ minHeight: 'calc(100vh - 60px)' }}>
              {loading ? (
                <Card className="pt-1">
                  <Card.Body className="text-center">
                    <h3>Το καλάθι είναι άδιο</h3>
                    <Button href="/" className="mt-3" block>
                      Πίσω στην αρχική
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  {/* TOTAL */}
                  <Row className="justify-content-center pt-5">
                    <h3>
                      Το σύνολο είναι:{' '}
                      {product?.promoCodePrice ? product?.promoCodePrice : product?.price}
                      €
                    </h3>
                  </Row>
                  <Row className="justify-content-center">
                    <p>Ready in seconds</p>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="4" className="mt-1">
                      <Button onClick={showPaypalButton} block>
                        Αγορά
                      </Button>
                    </Col>
                  </Row>
                  <Row className="justify-content-center pt-5 pb-5">
                    <hr style={{ color: 'red' }} />
                  </Row>
                  <Row className="justify-content-center ">
                    <CoProduct product={product} />
                  </Row>
                  <Row className="justify-content-center">
                    <hr />
                  </Row>
                </>
              )}
            </Container>
          </section>
        </Main>
      )}
    </>
  );
};

export default Checkout;
