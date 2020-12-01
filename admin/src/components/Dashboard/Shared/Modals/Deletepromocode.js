import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Deletepromocode = ({ showDelete, hideDelete, deleteCode, loading }) => {
  return (
    <>
      <Modal show={showDelete} onHide={hideDelete} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Διαγραφή κωδικού</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Θέλεις να διαγράψεις αυτόν τον κωδικό έκπτωσης ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDelete}>
            Έξοδος
          </Button>
          <Button variant="danger" type="button" onClick={deleteCode} disabled={loading}>
            {loading ? <>Περιμένετε</> : <>Διαγραφή κωδικού</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(Deletepromocode);
