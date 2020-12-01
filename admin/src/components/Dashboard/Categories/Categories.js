import React, { useState, useCallback, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Modal, Col, Row, Button, Spinner } from 'react-bootstrap';
import { apiUrl, axiosCallApi } from '../../../config/api';
import Axios from 'axios';
import CategoryAdd from './Components/CategoryAdd';
import CategoryEdit from './Components/CategoryEdit';
import Dashboard from '../Dashboard';
import dynamic from 'next/dynamic';
import Alert from '../Alerts/Alert';

const Tables = dynamic(() => import('./Components/Tables'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Pagination = dynamic(() => import('./Components/Pagination'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Search = dynamic(() => import('./Components/Search'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const Categories = () => {
  const [alert, setAlert] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState();
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [skip, setSkip] = useState(1);
  const handleShow = () => setShow(!show);

  // toggle alertttttt
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  // delete modal
  const handleShowDelete = (id) => {
    setCategoryId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };

  // edit modal
  const handleShowEdit = (id) => {
    setCategoryId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };

  // submit create course
  const handleSubmit = (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('file', values.image[0]);

    axiosCallApi
      .post(`${apiUrl}/courses/upload/${values.image[0].name}`, fd, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then(() => {
        axiosCallApi
          .post(
            `${apiUrl}/categories/new`,
            { name: values.name, options: values.options, image: values.image[0].name },
            {
              headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            }
          )
          .then(() => {
            toggleAlert();
            handleShow();
            setLoading(false);
            fetchCategories();
          });
      });
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
        .then(() => {
          const { name } = values;
          axiosCallApi
            .patch(
              `${apiUrl}/categories/category/${categoryId}`,
              {
                name,
                image: values?.image[0]?.name,
                order: values.order
              },
              {
                headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
              }
            )
            .then(() => {
              setShowEdit(false);
              setLoading(false);
              toggleAlert();
              fetchCategories();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      const { name } = values;
      axiosCallApi
        .patch(
          `${apiUrl}/categories/category/${categoryId}`,
          {
            name,
            order: values.order
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          setShowEdit(false);
          setLoading(false);
          toggleAlert();
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchCategories = () => {
    Axios.get(`${apiUrl}/categories/all?perPage=5&skip=${skip}&filter=${filter}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    }).then((response) => {
      setCategories(response.data.categories);
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

  // submit delete category
  const deleteCategory = () => {
    setLoading(true);
    Axios.delete(`${apiUrl}/categories/${categoryId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    })
      .then(() => {
        setLoading(false);
        hideDelete();
        toggleAlert();
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, [filter, skip]);

  return (
    <Dashboard>
      {alert ? <Alert message="Επιτυχία" /> : null}
      <Row className="mb-3">
        <Col xs="12" xl="6">
          <h3>Κατηγορίες</h3>
        </Col>
        {/* DESKTOP */}
        <Col className="text-right desktop" xs="12" xl="6">
          <Button className="d-flex align-items-center ml-auto" onClick={handleShow}>
            <FiPlus className="mr-1" />
            Προσθήκη κατηγορίας
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
            Προσθήκη μαθήματος
          </Button>
        </Col>
      </Row>
      {/* SEARCH */}
      <Search onChange={changeFilter} />
      {/* TABLE */}
      <Tables
        courses={categories}
        handleShowEdit={handleShowEdit}
        handleShowDelete={handleShowDelete}
      />
      {/* PAGINATION */}
      <Pagination changePage={changePage} skip={skip} />
      {/* MODAL ADD CATEGORY */}
      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Προσθήκη νέας κατηγορίας</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryAdd submit={handleSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Έξοδος
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="addCourse-form"
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Δημιουργία νέας κατηγορίας</>}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL DELETE COURSE */}
      <Modal show={showDelete} onHide={hideDelete} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Διαγραφή κατηγορίας</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Θέλεις να διαγράψεις αυτήν την κατηγορία ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDelete}>
            Έξοδος
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={deleteCategory}
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Διαγραφή κατηγορίας</>}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL EDIT COURSE */}
      <Modal show={showEdit} onHide={hideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Επεξεργασία κατηγορίας</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryEdit id={categoryId} submit={handleSubmitEdit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideEdit}>
            Έξοδος
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="editCourse-form"
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Αποθήκευση κατηγορίας</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </Dashboard>
  );
};

export default Categories;
