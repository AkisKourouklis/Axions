import React, { useState, useEffect } from 'react';
import { fetchLogo } from '../../../../utils/Config';

const Image = ({ imagekey }) => {
  const [image, setImage] = useState();

  const fetchStart = async () => {
    const logo = await fetchLogo(imagekey);
    setImage(logo);
  };

  useEffect(() => {
    fetchStart();
  }, [imagekey]);

  return (
    <>
      {image ? (
        <img src={image} alt="logo" width="100%" style={{ maxWidth: '300px' }} />
      ) : null}
    </>
  );
};

export default Image;
