import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';

const Tables = ({ data, handleShowDelete, handleShowEdit, handleShowAddVideo }) => {
  return (
    <>
      {data ? (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th className="desktop">#</th>
              <th>Όνομα</th>
              <th>Επιλογές</th>
              <th>Εντολές</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => {
              return (
                <tr key={data._id}>
                  <td className="desktop">{i}</td>
                  <td>{data.name}</td>
                  <td>
                    {data.options?.map((data) => {
                      return <span key={data._id}>{data.name} </span>;
                    })}
                  </td>
                  <td>
                    <Button className="mr-1" onClick={() => handleShowEdit(data._id)}>
                      <MdEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleShowDelete(data._id)}>
                      <MdDelete />
                    </Button>
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
