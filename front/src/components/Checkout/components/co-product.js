import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  checkoutRemoveProduct,
  checkoutDiscount,
  checkoutProduct
} from '../../../store/actions/checkout.actions';
import { publicApi } from '../../../config/api';

const CoProduct = ({ product }) => {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const discountPromo = useSelector((state) => state.checkout.discount);

  const removeProduct = () => {
    dispatch(checkoutRemoveProduct());
    router.push('/');
  };

  const fetchProductImage = () => {
    axios
      .post(`${publicApi}/courses/s3/single`, { file: product?.image })
      .then((response) => {
        setImage(response.data);
      });
  };

  const discount = async () => {
    axios
      .post(
        `${publicApi}/promoCodes/check`,
        {
          promoCode: discountPromo,
          courses: [product]
        },
        {
          headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
        }
      )
      .then((response) => {
        dispatch(checkoutProduct(response.data.courses[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDiscount = (e) => {
    dispatch(checkoutDiscount(e.target.value));
  };

  const submitdiscount = () => {
    discount();
  };

  useEffect(() => {
    fetchProductImage();
  }, [product]);

  return (
    <>
      <Row>
        <Col xs="12" lg="3" className="co-img-container">
          <img alt="img" src={image} width="100%" />
        </Col>
        <Col xs="12" lg="9" className="co-product-info">
          <Row>
            <Col xs="6">
              <h3>{product?.name}</h3>
            </Col>
            <Col xs="6" className="text-right">
              <h5>
                {product?.promoCodePrice ? product?.promoCodePrice : product?.price}€
              </h5>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col className="text-right">
              <Button onClick={removeProduct}>Αφαίρεση από το καλάθι</Button>
            </Col>
          </Row>
          <Row className="justify-content-end mt-5 text-right">
            <Col>
              <Form.Control onChange={handleDiscount} placeholder="Κωδικός έκπτωσης" />
              <Button className="mt-3" onClick={submitdiscount}>
                Υποβολή έκπτωσης
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CoProduct;
