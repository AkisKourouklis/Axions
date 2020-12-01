import React, { useState, useEffect, useCallback } from 'react';
import { apiUrl, axiosCallApi } from '../../../config/api';
import { FiPlus } from 'react-icons/fi';
import { Spinner, Row, Button, Col } from 'react-bootstrap';
import Alert from '../Alerts/Alert';
import Dashboard from '../Dashboard';
import dynamic from 'next/dynamic';
import ProductAddModal from '../Shared/Modals/AddProduct';
import ProductDeleteModal from '../Shared/Modals/DeleteProduct';
import ProductEditModal from '../Shared/Modals/EditProduct';
import { useRouter } from 'next/router';

const Tables = dynamic(() => import('../Shared/Tables/ProductTable'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Pagination = dynamic(() => import('../Shared/Pagination/Pagination'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Search = dynamic(() => import('../Shared/Search/Search'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const Products = () => {
  const [products, setproducts] = useState();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
  const [productId, setproductId] = useState();
  const router = useRouter();
  const handleShow = () => setShow(!show);

  // delete modal
  const handleShowDelete = (id) => {
    setproductId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };

  // edit modal
  const handleShowEdit = (id) => {
    setproductId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };

  // fetch products
  const fetchproducts = () => {
    axiosCallApi
      .get(`${apiUrl}/products/all?perPage=5&skip=${skip}&filter=${filter}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setproducts(response.data);
      });
  };

  // change page and searh function
  const changePage = useCallback(
    (type) => {
      if (type === 'next') {
        setSkip(skip + 1);
      } else {
        setSkip(skip - 1);
      }
      if (skip === 0) {
        setSkip(1);
      }
    },
    [skip, setSkip]
  );
  const changeFilter = useCallback(
    (text) => {
      setFilter(text.target.value);
    },
    [setFilter]
  );

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  // submit create course
  const handleSubmit = (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('file', values.image[0]);
    // HERE WE UPLOAD IMAGE TO AMAZON S3
    if (values?.image[0]?.name) {
      axiosCallApi
        .post(`${apiUrl}/courses/upload/${values.image[0].name}`, fd, {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        })
        .then((response) => {
          const { title, description, visible, price, stock } = values;
          // HERE WE UPLOAD COURSE FIELDS TO API WITH RESPONSE BEEING THE IMAGE LOCATION
          axiosCallApi
            .post(
              `${apiUrl}/products/new`,
              {
                title,
                description,
                visible,
                price,
                stock,
                images: {
                  url: response.data,
                  key: values.image[0].name
                }
              },
              {
                headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
              }
            )
            .then(() => {
              setLoading(false);
              setShow(false);
              toggleAlert();
              fetchproducts();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      const { title, description, visible, price, stock } = values;
      // HERE WE UPLOAD COURSE FIELDS TO API WITH RESPONSE BEEING THE IMAGE LOCATION
      axiosCallApi
        .post(
          `${apiUrl}/products/new`,
          {
            title,
            description,
            visible,
            price,
            stock
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          setLoading(false);
          setShow(false);
          toggleAlert();
          fetchproducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // submit edit course
  const handleSubmitEdit = (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('file', values.image[0]);

    // HERE WE UPLOAD IMAGE TO AMAZON S3
    if (values?.image[0]?.name) {
      axiosCallApi
        .post(`${apiUrl}/courses/upload/${values.image[0].name}`, fd, {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        })
        .then((response) => {
          const { title, description, visible, price, stock } = values;
          axiosCallApi
            .patch(
              `${apiUrl}/products/${productId}`,
              {
                title,
                description,
                visible,
                price,
                stock
              },
              {
                headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
              }
            )
            .then((doc) => {
              axiosCallApi.patch(
                `${apiUrl}/products/image/${doc.data._id}`,
                {
                  url: response.data,
                  key: values.image[0].name
                },
                {
                  headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
                }
              );
              setLoading(false);
              setShowEdit(false);
              toggleAlert();
              fetchproducts();
              router.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      const { title, description, visible, price, stock } = values;
      axiosCallApi
        .patch(
          `${apiUrl}/products/${productId}`,
          {
            title,
            description,
            visible,
            price,
            stock
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then((doc) => {
          setLoading(false);
          setShowEdit(false);
          toggleAlert();
          fetchproducts();
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // submit delete course
  const deleteProduct = () => {
    setLoading(true);
    axiosCallApi
      .post(`${apiUrl}/products/delete/${productId}`, null, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then(() => {
        setLoading(false);
        hideDelete();
        toggleAlert();
        fetchproducts();
      });
  };

  useEffect(() => {
    fetchproducts();
  }, [skip, filter]);

  return (
    <>
      <Dashboard>
        {alert ? <Alert message="Επιτυχία" /> : null}
        {/* OPTIONS */}
        <Row className="mb-3">
          <Col xs="12" xl="6">
            <h3>Προιόντα</h3>
          </Col>
          {/* DESKTOP */}
          <Col className="text-right desktop" xs="12" xl="6">
            <Button className="d-flex align-items-center ml-auto" onClick={handleShow}>
              <FiPlus className="mr-1" />
              Προσθήκη προιόντος
            </Button>
          </Col>
          {/* TABLET */}
          <Col className="text-right tablet" xs="12" xl="6">
            <Button
              className="d-flex align-items-center ml-auto"
              block
              onClick={handleShow}
            >
              <FiPlus className="mr-1" />
              Προσθήκη προιόντος
            </Button>
          </Col>
        </Row>
        {/* SEARCH */}
        <Search onChange={changeFilter} />
        {/* TABLE */}
        <Tables
          products={products?.products}
          handleShowEdit={handleShowEdit}
          handleShowDelete={handleShowDelete}
        />
        {/* PAGINATION */}
        <Pagination changePage={changePage} skip={skip} />
        {/* MODAL ADD PRODUCT */}
        <ProductAddModal
          loading={loading}
          submit={handleSubmit}
          show={show}
          handleShow={handleShow}
        />
        {/* MODAL DELETE product */}
        <ProductDeleteModal
          showDelete={showDelete}
          hideDelete={hideDelete}
          loading={loading}
          deleteProduct={deleteProduct}
        />
        {/* MODAL EDIT product */}
        <ProductEditModal
          showEdit={showEdit}
          hideEdit={hideEdit}
          submit={handleSubmitEdit}
          loading={loading}
          id={productId}
        />
      </Dashboard>
    </>
  );
};

export default Products;
