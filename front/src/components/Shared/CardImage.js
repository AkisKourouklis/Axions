import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CatalogContext } from '../../store/Context/Context';
import { fetchSingle } from '../../utils/S3';
import { useRouter } from 'next/router';

const CardImage = ({ file, size, color }) => {
  const { setCatalogFilters } = useContext(CatalogContext);
  const [image, setImage] = useState();
  const router = useRouter();

  const fetchStart = async () => {
    if (file.image) {
      const response = await fetchSingle(file.image);
      setImage(response);
    }
  };

  const changeFilter = () => {
    setCatalogFilters({
      filter: '',
      filter2: file.name,
      filter3: '',
      filter4: '',
      filter5: ''
    });
    router.push('/catalog');
    console.log(file.name);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <>
      <Card
        className={
          size === 'small'
            ? ' w-100 image-card-small'
            : size === 'large'
            ? 'w-100 image-card-large'
            : 'w-100 image-card'
        }
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`
        }}
      >
        {size === 'large' ? (
          <>
            <h1 className="text-light font-weight-bold">{file.name}</h1>
            <Button
              size="lg"
              type="button"
              variant={color}
              className="w-75 font-weight-bold mt-3"
              style={{ maxWidth: '300px' }}
            >
              {file.name}
            </Button>
          </>
        ) : null}
      </Card>
      {size === 'large' ? null : (
        <Button
          onClick={changeFilter}
          type="button"
          variant={color}
          className="w-100 font-weight-bold"
        >
          {file.name}
        </Button>
      )}
    </>
  );
};

export default CardImage;
