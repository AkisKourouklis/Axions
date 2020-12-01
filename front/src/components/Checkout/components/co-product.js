import React, { useState, useEffect, useContext } from 'react';
import { CheckoutContext, PriceContext } from '../../../store/Context/Context';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { discount } from '../../../utils/Checkout';
import { publicApi } from '../../../config/api';
import { useRouter } from 'next/router';
import { replaceAt, removeAt } from '../../../utils/Arrays';
import axios from 'axios';

const CoProduct = ({ data, itemNum }) => {
  const [image, setImage] = useState();
  const [discountValue, setDiscount] = useState();
  const [product, setProduct] = useState();
  const { checkout } = useContext(CheckoutContext);
  const { price, setPrice } = useContext(PriceContext);
  const router = useRouter();

  const removeProduct = () => {
    const item = checkout.splice(0, 1);
    console.log(item);
    // setCheckout([]);
  };

  const fetchProductImage = () => {
    axios
      .post(`${publicApi}/courses/s3/single`, { file: data.product?.images[0].key })
      .then((response) => {
        setImage(response.data);
      });
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const submitdiscount = async () => {
    const _discount = await discount(discountValue, data.product);
    const newArray = replaceAt(price, itemNum, _discount.promoCodePrice);
    setPrice(newArray);
    setProduct({
      options: data.options,
      product: data.product,
      discount: _discount.promoCodePrice
    });
  };

  const _setPrice = () => {
    const _price = data?.discount ? data.discount : data.product?.price;
    setPrice((price) => [...price, parseInt(_price)]);
  };

  useEffect(() => {
    fetchProductImage();
  }, [data]);

  useEffect(() => {
    setProduct(data);
    _setPrice();
  }, []);

  return (
    <>
      {product ? (
        <Row>
          <Col xs="12" lg="3" className="co-img-container">
            <img alt="img" src={image} width="100%" />
          </Col>
          <Col xs="12" lg="9" className="co-product-info">
            <Row>
              <Col xs="6">
                {router.query?.type === 'product' ? (
                  <h3>{product?.product?.title}</h3>
                ) : (
                  <h3>{product?.product?.name}</h3>
                )}
              </Col>
              <Col xs="6" className="text-right">
                <h5>
                  {product ? (
                    <>
                      {product?.discount ? product?.discount : product?.product?.price}€
                    </>
                  ) : (
                    <>{data?.discount ? data?.discount : data?.product?.price}€</>
                  )}
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
      ) : null}
    </>
  );
};

export default CoProduct;
