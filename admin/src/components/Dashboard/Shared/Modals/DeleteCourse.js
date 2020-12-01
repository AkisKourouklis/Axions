import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCourse = ({ showDelete, hideDelete, deleteCourse, loading }) => {
  return (
    <>
      <Modal show={showDelete} onHide={hideDelete} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Διαγραφή μαθήματος</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Θέλεις να διαγράψεις αυτό το μάθημα ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDelete}>
            Έξοδος
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={deleteCourse}
            disabled={loading}
          >
            {loading ? <>Περιμένετε</> : <>Διαγραφή Μαθήματος</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(DeleteCourse);
