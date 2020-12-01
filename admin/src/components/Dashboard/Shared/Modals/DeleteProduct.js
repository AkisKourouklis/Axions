import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteProduct = ({ showDelete, hideDelete, loading, deleteProduct }) => {
  return (
    <>
      <Modal show={showDelete} onHide={hideDelete} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Διαγραφή προιόντος</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Θέλεις να διαγράψεις αυτό το προιόν ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDelete}>
            Έξοδος
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={deleteProduct}
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Διαγραφή προιόντος</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(DeleteProduct);
