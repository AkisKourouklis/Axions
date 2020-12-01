import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { publicApi } from '../../config/api';
import { checkoutDiscount, checkoutProduct } from '../../store/actions/checkout.actions';
import Main from '../Main';
import ProductVideo from './components/ProductVideo';

const Course = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [courseData, setCourse] = useState();
  const [image, setImage] = useState();
  const discountPromo = useSelector((state) => state.checkout.discount);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const discount = async () => {
    try {
      const discountRequest = await axios.post(
        `${publicApi}/promoCodes/check`,
        {
          promoCode: discountPromo,
          courses: [courseData]
        },
        {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
        }
      );
      const { courses } = await discountRequest.data;
      dispatch(checkoutProduct(courses[0]));
    } catch (err) {
      console.log(err);
    }
  };

  const checkout = () => {
    discount();
    dispatch(checkoutProduct(courseData));
    router.push('/checkout');
  };

  const handleDiscount = (e) => {
    dispatch(checkoutDiscount(e.target.value));
  };

  const fetchImage = (_image) => {
    axios.post(`${publicApi}/courses/s3/single`, { file: _image }).then((response) => {
      setImage(response.data);
    });
  };

  const fetchCourses = () => {
    axios
      .get(`${publicApi}/courses/${router.query.id}`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setCourse(response.data.course);
        fetchImage(response.data.course.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Main>
      <Container>
        <section className="bg-light pt-5 pb-5">
          <Row>
            <Col xs={12} lg={6}>
              <div>{image ? <img alt="img" src={image} width="100%" /> : null}</div>
            </Col>
            <Col className="product-right-column mt-5" xs={12} lg={6}>
              <h3 className="bold">{courseData?.name}</h3>
              <p>Εύκολα, γρήγορα με ένα κλικ</p>
              <h3>{courseData?.price}€</h3>
              <Form.Group>
                <Form.Control
                  onChange={handleDiscount}
                  type="text"
                  placeholder="Κωδικός Έκπτωσης"
                />
              </Form.Group>
              <div style={{ marginTop: '20px' }}>
                {isAuth ? (
                  <>
                    <Button onClick={checkout} block>
                      Αγορά
                    </Button>
                  </>
                ) : (
                  <Button href="/authentication/register" block>
                    Εγγραφή
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          {/* PREVIABLE VIDEOS */}
          <Row className="mt-5">
            <Col>
              {/* Εισαγωγή */}
              <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Εισαγωγή</p>
                  {courseData?.videos
                    .filter((data) => data.section === 'Εισαγωγή')
                    .map((doc) => (
                      <>
                        {doc.isIntro ? (
                          <>
                            {doc.isPreviable ? (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                  <Card.Body>
                                    <ProductVideo file={doc} />
                                  </Card.Body>
                                </Card>
                              </div>
                            ) : (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                </Card>
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
              {/* Επίγνωση */}
              <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Επίγνωση</p>
                  {courseData?.videos
                    .filter((data) => data.section === 'Επίγνωση')
                    .map((doc) => (
                      <>
                        {doc.isIntro ? (
                          <>
                            {doc.isPreviable ? (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                  <Card.Body>
                                    <ProductVideo file={doc} />
                                  </Card.Body>
                                </Card>
                              </div>
                            ) : (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                </Card>
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
              {/* Συνειδητό μυαλό */}
              <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Συνειδητό μυαλό</p>
                  {courseData?.videos
                    .filter((data) => data.section === 'Συνειδητό μυαλό')
                    .map((doc) => (
                      <>
                        {doc.isIntro ? (
                          <>
                            {doc.isPreviable ? (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                  <Card.Body>
                                    <ProductVideo file={doc} />
                                  </Card.Body>
                                </Card>
                              </div>
                            ) : (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                </Card>
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
              {/* Υποσυνείδητο μυαλό */}
              <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Υποσυνείδητο μυαλό
                  </p>
                  {courseData?.videos
                    .filter((data) => data.section === 'Υποσυνείδητο μυαλό')
                    .map((doc) => (
                      <>
                        {doc.isIntro ? (
                          <>
                            {doc.isPreviable ? (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                  <Card.Body>
                                    <ProductVideo file={doc} />
                                  </Card.Body>
                                </Card>
                              </div>
                            ) : (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                </Card>
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
              {/* Αποφώνηση */}
              <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Αποφώνηση</p>
                  {courseData?.videos
                    .filter((data) => data.section === 'Αποφώνηση')
                    .map((doc) => (
                      <>
                        {doc.isIntro ? (
                          <>
                            {doc.isPreviable ? (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                  <Card.Body>
                                    <ProductVideo file={doc} />
                                  </Card.Body>
                                </Card>
                              </div>
                            ) : (
                              <div style={{ order: `${doc.order}` }} className="mb-1">
                                <Card key={doc._id}>
                                  <Card.Header className="bold">{doc.title}</Card.Header>
                                </Card>
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Main>
  );
};

export default Course;
