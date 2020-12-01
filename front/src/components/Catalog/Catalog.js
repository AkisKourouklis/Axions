import React, { useState, useEffect, useContext } from 'react';
import Main from '../Main';
import Filters from './components/Filters';
import Products from './components/Products';
import { axiosCallApi, publicApi } from '../../config/api';
import { CatalogContext } from '../../store/Context/Context';
import { Spinner } from 'react-bootstrap';

const Catalog = () => {
  const [products, setProducts] = useState();
  const [perPage, setperPage] = useState(10);
  const { catalogfilters } = useContext(CatalogContext);

  const fetchStart = () => {
    axiosCallApi
      .get(
        `${publicApi}/products/all?perPage=${perPage}&filter=${catalogfilters.filter}&filter2=${catalogfilters.filter2}&filter3=${catalogfilters.filter3}&filter4=${catalogfilters.filter4}&filter5=${catalogfilters.filter5}`
      )
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadMore = () => {
    setperPage(perPage + 10);
  };

  useEffect(() => {
    fetchStart();
  }, [catalogfilters, perPage]);

  return (
    <>
      {products ? (
        <Main>
          <Filters />
          <Products products={products} loadMore={loadMore} />
        </Main>
      ) : (
        <div
          style={{ height: '100vh' }}
          className="d-flex justify-content-center align-items-center bg-dark"
        >
          <Spinner className="mb-1" animation="border" size="lg" variant="light" />
        </div>
      )}
    </>
  );
};

export default Catalog;
