import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { apiUrl } from '../../../../config/api';

const Images = ({ id, file, fetchProduct, type }) => {
  const [image, setImage] = useState();

  const fetchImage = () => {
    axios
      .post(`${apiUrl}/courses/s3/single`, { file })
      .then((response) => {
        setImage(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteImage = () => {
    axios
      .post(
        `${apiUrl}/${type}/image/remove/${file}`,
        { id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        fetchProduct();
      });
  };

  useEffect(() => {
    fetchImage();
  }, [file]);

  return (
    <>
      {file ? (
        <Card style={{ height: '180px' }}>
          <Card.Body className="p-1 d-flex align-items-center justify-content-center">
            <img height="100%" width="auto" alt="img" src={image} />
          </Card.Body>
          <Card.Footer>
            <Button block type="button" variant="danger" size="sm" onClick={deleteImage}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      ) : null}
    </>
  );
};

export default Images;
