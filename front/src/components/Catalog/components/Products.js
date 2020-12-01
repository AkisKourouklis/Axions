import React from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Card from './Card';
import Link from 'next/link';

const Products = ({ products, loadMore }) => {
  return (
    <Container className="pt-5 pb-5">
      <Row>
        {products?.map((data) => {
          return (
            <Col key={data._id} className="mb-3" xs="12" lg="6" xl="3">
              <Link href={`/product?id=${data._id}&type=product`}>
                <a>
                  <Card file={data.images[0].key} />
                  <p className="mt-2 text-dark">{data.description}</p>
                  <h5 className="mt-4 font-weight-bold text-dark">{data.price}€</h5>
                </a>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="text-center">
          <Button onClick={loadMore} size="lg" className=" text font-weight-bold w-25">
            Περισσότερα
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
