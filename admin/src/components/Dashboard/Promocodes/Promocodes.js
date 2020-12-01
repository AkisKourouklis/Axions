import React, { useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../../../config/api';
import { MdAdd } from 'react-icons/md';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import AddpromocodeModal from '../Shared/Modals/Addpromocode';
import Alert from '../Alerts/Alert';
import axios from 'axios';
import Dashboard from '../Dashboard';
import Deletepromocode from '../Shared/Modals/Deletepromocode';
import EditpromocodeModal from '../Shared/Modals/Editpromocode';
import dynamic from 'next/dynamic';

const PromocodeTable = dynamic(() => import('../Shared/Tables/PromocodeTable'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Pagination = dynamic(() => import('../Shared/Pagination/Pagination'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Search = dynamic(() => import('../Shared/Search/Search'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const Promocodes = () => {
  const [codes, setCodes] = useState();
  const [codeId, setCodeId] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  // delete modal
  const handleShowDelete = (id) => {
    setCodeId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };
  // edit modal
  const handleShowΕdit = (id) => {
    setCodeId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };
  // add modal
  const toggleShowAdd = (id) => {
    setShowAdd(true);
    setCodeId(id);
  };
  const toggleHideAdd = () => {
    setShowAdd(false);
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

  const fetchCodes = () => {
    axios
      .get(`${apiUrl}/promoCodes/all?perPage=5&skip=${skip}&filter=${filter}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCodes(response.data.promoCodes);
      });
  };

  const onSubmitAdd = (values) => {
    axios
      .post(
        `${apiUrl}/promoCodes/new`,
        {
          name: values.name,
          isPercentage: values.isPercentage,
          value: values.value,
          appliesOn: values.appliesOn
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        toggleAlert();
        toggleHideAdd();
        fetchCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmitEdit = (values) => {
    axios
      .patch(
        `${apiUrl}/promoCodes`,
        {
          _id: codeId,
          name: values.name,
          isPercentage: values.isPercentage,
          value: values.value,
          appliesOn: values.appliesOn
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        toggleAlert();
        hideEdit();
        fetchCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit delete course
  const deleteCode = () => {
    setLoading(true);
    axios
      .post(`${apiUrl}/promoCodes/delete/${codeId}`, null, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setLoading(false);
        hideDelete();
        toggleAlert();
        fetchCodes();
      });
  };

  useEffect(() => {
    fetchCodes();
  }, [skip, filter]);

  return (
    <>
      <Dashboard>
        {alert ? <Alert message="Επιτυχία" /> : null}
        <Row className="mb-3">
          <Col xs="12" xl="6">
            <h3>Κωδικοί εκπτώσεων</h3>
          </Col>
          <Col xs="12" xl="6" className="text-right">
            <Button className="d-flex align-items-center ml-auto" onClick={toggleShowAdd}>
              <MdAdd className="mr-1" />
              Προσθήκη κωδικού
            </Button>
          </Col>
        </Row>
        <Search onChange={changeFilter} />
        <PromocodeTable
          codes={codes}
          handleShowDelete={handleShowDelete}
          handleShowΕdit={handleShowΕdit}
          setCodeId={setCodeId}
        />
        <Pagination changePage={changePage} skip={skip} />

        {/* MODAL ADD PROMOCODE */}
        <AddpromocodeModal
          showAdd={showAdd}
          toggleHideAdd={toggleHideAdd}
          onSubmit={onSubmitAdd}
        />
        {/* MODAL EDIT PROMOCODE */}
        <EditpromocodeModal
          showEdit={showEdit}
          hideEdit={hideEdit}
          onSubmit={onSubmitEdit}
          loading={loading}
          id={codeId}
        />

        {/* MODAL DELETE PROMOCODE */}
        <Deletepromocode
          showDelete={showDelete}
          hideDelete={hideDelete}
          deleteCode={deleteCode}
          loading={loading}
        />
      </Dashboard>
    </>
  );
};

export default Promocodes;
