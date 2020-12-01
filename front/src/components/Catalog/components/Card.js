import React, { useState, useEffect } from 'react';
import { fetchSingle } from '../../../utils/S3';
import { Spinner, Card } from 'react-bootstrap';

const Image = ({ file }) => {
  const [image, setImage] = useState();

  const fetchStart = async () => {
    const response = await fetchSingle(file);
    setImage(response);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <>
      {image ? (
        <Card
          className="w-100 hover product-card"
          style={{
            minHeight: '500px',
            background: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
      ) : (
        <Spinner size="sm" />
      )}
    </>
  );
};

export default Image;
