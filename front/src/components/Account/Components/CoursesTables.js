import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const CoursesTables = ({ courses }) => {
  const router = useRouter();

  const gotoProduct = (id) => {
    router.push(`/account/course?id=${id}`);
  };

  return (
    <>
      <Row style={{ marginTop: '50px' }}>
        {courses?.map((data) => {
          return (
            <Col key={data._id} xs="12" md="6" lg="4">
              <Card>
                <Card.Header>{data.name}</Card.Header>
                <Card.Body>
                  <ul style={{ marginLeft: '1rem' }}>
                    {data?.options?.map((option) => {
                      return (
                        <li
                          style={{
                            fontSize: '1rem',
                            color: '#090909',
                            marginTop: '10px'
                          }}
                          key={option._id}
                        >
                          {option.name}
                        </li>
                      );
                    })}
                  </ul>
                </Card.Body>
                <Card.Footer>
                  <Button block onClick={() => gotoProduct(data._id)}>
                    Go to course
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default CoursesTables;
