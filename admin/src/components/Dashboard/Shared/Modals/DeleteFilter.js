import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteFilter = ({ showDelete, hideDelete, deleteCategory, loading }) => {
  return (
    <>
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
    </>
  );
};

export default DeleteFilter;
