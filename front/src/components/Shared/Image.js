import React, { useState, useEffect } from 'react';
import { fetchSingle } from '../../utils/S3';
import { Spinner } from 'react-bootstrap';

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
    <>{image ? <img alt={file} src={image} width="100%" /> : <Spinner size="sm" />}</>
  );
};

export default Image;
