import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ProductVideo from './ProductVideo';

const PreviableVideos = ({ data }) => {
  return (
    <>
      <Row className="mt-5">
        <Col>
          {/* Εισαγωγή */}
          <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Εισαγωγή</p>
              {data?.videos
                ?.filter((data) => data.section === 'Εισαγωγή')
                ?.map((doc) => (
                  <div key={doc._id}>
                    {doc.isIntro ? (
                      <>
                        {doc.isPreviable ? (
                          <div style={{ order: `${doc.order}` }} className="mb-1">
                            <Card>
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
                  </div>
                ))}
            </div>
          </div>
          {/* Επίγνωση */}
          <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Επίγνωση</p>
              {data?.videos
                ?.filter((data) => data.section === 'Επίγνωση')
                ?.map((doc) => (
                  <div key={doc._id}>
                    {doc.isIntro ? (
                      <>
                        {doc.isPreviable ? (
                          <div style={{ order: `${doc.order}` }} className="mb-1">
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                              <Card.Body>
                                <ProductVideo file={doc} />
                              </Card.Body>
                            </Card>
                          </div>
                        ) : (
                          <div
                            key={doc._id}
                            style={{ order: `${doc.order}` }}
                            className="mb-1"
                          >
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                            </Card>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
          {/* Συνειδητό μυαλό */}
          <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Συνειδητό μυαλό</p>
              {data?.videos
                ?.filter((data) => data.section === 'Συνειδητό μυαλό')
                ?.map((doc) => (
                  <div key={doc._id}>
                    {doc.isIntro ? (
                      <>
                        {doc.isPreviable ? (
                          <div style={{ order: `${doc.order}` }} className="mb-1">
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                              <Card.Body>
                                <ProductVideo file={doc} />
                              </Card.Body>
                            </Card>
                          </div>
                        ) : (
                          <div
                            key={doc._id}
                            style={{ order: `${doc.order}` }}
                            className="mb-1"
                          >
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                            </Card>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
          {/* Υποσυνείδητο μυαλό */}
          <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Υποσυνείδητο μυαλό</p>
              {data?.videos
                ?.filter((data) => data.section === 'Υποσυνείδητο μυαλό')
                ?.map((doc) => (
                  <div key={doc._id}>
                    {doc.isIntro ? (
                      <>
                        {doc.isPreviable ? (
                          <div style={{ order: `${doc.order}` }} className="mb-1">
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                              <Card.Body>
                                <ProductVideo file={doc} />
                              </Card.Body>
                            </Card>
                          </div>
                        ) : (
                          <div
                            key={doc._id}
                            style={{ order: `${doc.order}` }}
                            className="mb-1"
                          >
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                            </Card>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
          {/* Αποφώνηση */}
          <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Αποφώνηση</p>
              {data?.videos
                ?.filter((data) => data.section === 'Αποφώνηση')
                ?.map((doc) => (
                  <div key={doc._id}>
                    {doc.isIntro ? (
                      <>
                        {doc.isPreviable ? (
                          <div style={{ order: `${doc.order}` }} className="mb-1">
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                              <Card.Body>
                                <ProductVideo file={doc} />
                              </Card.Body>
                            </Card>
                          </div>
                        ) : (
                          <div
                            key={doc._id}
                            style={{ order: `${doc.order}` }}
                            className="mb-1"
                          >
                            <Card>
                              <Card.Header className="bold">{doc.title}</Card.Header>
                            </Card>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PreviableVideos;
