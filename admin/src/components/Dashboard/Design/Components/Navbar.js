import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { axiosCallApi, apiUrl } from '../../../../config/api';
import { useForm } from 'react-hook-form';

const Navbar = ({ show, handleClose, data, toggleAlert, fetchDesign }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const saveChanges = (values) => {
    const { searchType } = values;
    setLoading(true);

    if (data[0]?.navbar) {
      const { _id } = data[0];
      axiosCallApi
        .patch(
          `${apiUrl}/design/navbar/searchType`,
          {
            searchType,
            id: _id
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          setLoading(false);
          handleClose();
          fetchDesign();
          toggleAlert();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosCallApi
        .patch(
          `${apiUrl}/design/navbar/searchType`,
          {
            searchType
          },
          {
            headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
          }
        )
        .then(() => {
          setLoading(false);
          handleClose();
          toggleAlert();
          fetchDesign();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Επικεφαλίδα</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(saveChanges)} id="searchType-form">
            <Form.Group>
              <Form.Label>Τύπος αναζήτησης</Form.Label>
              <Form.Control
                ref={register()}
                as="select"
                name="searchType"
                defaultValue={data?.navbar?.searchType}
              >
                <option value="course">Μάθημα</option>
                <option value="product">Προιόν</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Έξοδος
          </Button>
          <Button
            disabled={loading}
            variant="primary"
            type="submit"
            form="searchType-form"
          >
            {loading ? 'Περιμένετε' : 'Αποθήκευση αλλαγών'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Navbar);
