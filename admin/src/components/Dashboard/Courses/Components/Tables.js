import React from 'react';
import { Table, Button, Spinner, ButtonGroup } from 'react-bootstrap';
import { MdEdit, MdDelete, MdVideoCall } from 'react-icons/md';

const Tables = ({ courses, handleShowDelete, handleShowEdit, handleShowAddVideo }) => {
  return (
    <>
      {courses ? (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th className="desktop">#</th>
              <th>Όνομα</th>
              <th>Τιμή</th>
              <th>Βίντεο</th>
              <th>Εντολές</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((data, i) => {
              return (
                <tr key={data._id}>
                  <td className="desktop">{i}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.videos.length}</td>
                  <td>
                    <ButtonGroup>
                      <Button onClick={() => handleShowAddVideo(data._id)}>
                        <MdVideoCall />
                      </Button>
                      <Button onClick={() => handleShowEdit(data._id)}>
                        <MdEdit />
                      </Button>
                      <Button variant="danger" onClick={() => handleShowDelete(data._id)}>
                        <MdDelete />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Spinner className="mb-1" animation="border" size="sm" />
      )}
    </>
  );
};

export default Tables;
