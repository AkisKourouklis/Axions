import React, { useState, useCallback, useEffect } from 'react';
import { apiUrl, axiosCallApi } from '../../../config/api';
import { Col, Row, Button, Spinner } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import AddFilter from '../Shared/Modals/AddFilter';
import Alert from '../Alerts/Alert';
import Axios from 'axios';
import Dashboard from '../Dashboard';
import DeleteFilter from '../Shared/Modals/DeleteFilter';
import dynamic from 'next/dynamic';
import EditFilter from '../Shared/Modals/EditFilter';

const Tables = dynamic(() => import('../Shared/Tables/FilterTables'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Pagination = dynamic(() => import('../Shared/Pagination/Pagination'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Search = dynamic(() => import('../Shared/Search/Search'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const FiltersPage = () => {
  const [alert, setAlert] = useState();
  const [filterId, setfilterId] = useState();
  const [Filters, setFilters] = useState();
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
    setfilterId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };

  // edit modal
  const handleShowEdit = (id) => {
    setfilterId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };

  // submit create course
  const handleSubmit = (values) => {
    setLoading(true);

    axiosCallApi
      .post(
        `${apiUrl}/filters/new`,
        { name: values.name, options: values.options },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        toggleAlert();
        handleShow();
        setLoading(false);
        fetchFilters();
      });
  };

  // submit edit course
  const handleSubmitEdit = (values) => {
    setLoading(true);

    const { name } = values;
    axiosCallApi
      .patch(
        `${apiUrl}/filters/filter/${filterId}`,
        {
          name
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setShowEdit(false);
        setLoading(false);
        toggleAlert();
        fetchFilters();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFilters = () => {
    Axios.get(`${apiUrl}/filters/all?perPage=5&skip=${skip}&filter=${filter}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    }).then((response) => {
      setFilters(response.data.filters);
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
    Axios.delete(`${apiUrl}/Filters/${filterId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    })
      .then(() => {
        setLoading(false);
        hideDelete();
        toggleAlert();
        fetchFilters();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <Dashboard>
      {alert ? <Alert message="Επιτυχία" /> : null}
      <Row className="mb-3">
        <Col xs="12" xl="6">
          <h3>Φίλτρα</h3>
        </Col>
        {/* DESKTOP */}
        <Col className="text-right desktop" xs="12" xl="6">
          <Button className="d-flex align-items-center ml-auto" onClick={handleShow}>
            <FiPlus className="mr-1" />
            Προσθήκη φίλτρου
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
        data={Filters}
        handleShowEdit={handleShowEdit}
        handleShowDelete={handleShowDelete}
      />
      {/* PAGINATION */}
      <Pagination changePage={changePage} skip={skip} />
      {/* MODAL ADD FILTER */}
      <AddFilter
        show={show}
        handleShow={handleShow}
        submit={handleSubmit}
        loading={loading}
      />
      <DeleteFilter
        showDelete={showDelete}
        hideDelete={hideDelete}
        deleteCategory={deleteCategory}
        loading={loading}
      />
      {/* MODAL EDIT Filter */}
      <EditFilter
        showEdit={showEdit}
        hideEdit={hideEdit}
        filterId={filterId}
        submit={handleSubmitEdit}
        loading={loading}
      />
    </Dashboard>
  );
};

export default FiltersPage;
