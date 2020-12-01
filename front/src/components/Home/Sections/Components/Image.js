import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { publicApi } from '../../../../config/api';

const Image = ({ imagekey }) => {
  const [image, setImage] = useState();

  const fetchImage = () => {
    axios.post(`${publicApi}/courses/s3/single`, { file: imagekey }).then((response) => {
      setImage(response.data);
    });
  };
  useEffect(() => {
    fetchImage();
  }, [imagekey]);

  return (
    <>
      <img src={image} alt="logo" width="100%" style={{ maxWidth: '300px' }} />
    </>
  );
};

export default Image;
