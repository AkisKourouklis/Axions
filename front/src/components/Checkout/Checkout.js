import React, { useState, useContext } from 'react';
import { Row, Container, Button, Col, Card } from 'react-bootstrap';
import { CheckoutContext, AuthContext, PriceContext } from '../../store/Context/Context';
import CoProduct from './components/co-product';
import Main from '../Main';
import Paypal from '../Paypal/paypal';
import { addCourse } from '../../utils/Checkout';

const Checkout = () => {
  const { checkout } = useContext(CheckoutContext);
  const { auth } = useContext(AuthContext);
  const { price, setPrice } = useContext(PriceContext);
  const [showPaypal, setShowPaypal] = useState(false);

  const showPaypalButton = () => {
    setShowPaypal(true);
  };

  const onSuccess = () => {
    addCourse(checkout.checkout.product, auth.id);
  };

  const onError = () => {
    console.log('error');
  };

  console.log('price', price);
  return (
    <>
      {price?.map((data) => `${data}, `)}
      {showPaypal ? (
        <div className="paypal-container">
          <Paypal
            onSuccess={onSuccess}
            onError={onError}
            ammount={price?.reduce((a, b) => a + b, 0)}
          />
        </div>
      ) : (
        <Main>
          <section className="bg-light pt-5 pb-5">
            <Container style={{ minHeight: 'calc(100vh - 60px)' }}>
              {checkout.length < 1 ? (
                <Card className="mt-5 pt-1 w-50 mx-auto">
                  <Card.Body className="text-center">
                    <h3>Το καλάθι σας είναι άδειο</h3>
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
                      {price ? (
                        <strong>{price.reduce((a, b) => a + b, 0)}€</strong>
                      ) : null}
                    </h3>
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
                    {checkout?.map((data, i) => {
                      return (
                        <div key={i}>
                          <CoProduct
                            data={data}
                            itemNum={i}
                            price={price}
                            setPrice={setPrice}
                          />
                        </div>
                      );
                    })}
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
