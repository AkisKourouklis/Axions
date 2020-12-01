import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';

const Tables = ({ products, handleShowDelete, handleShowEdit }) => {
  return (
    <>
      {products ? (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th className="desktop">#</th>
              <th>Τίτλος</th>
              <th className="desktop">Περιγραφή</th>
              <th>Τιμή</th>
              <th className="desktop">Ορατό</th>
              <th>Ενέργειες</th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, i) => {
              return (
                <tr key={data._id}>
                  <td className="desktop">{i}</td>
                  <td>{data.title}</td>
                  <td className="desktop">{data.description}</td>
                  <td>{data.price}</td>
                  <td className="desktop">{data.visible}</td>
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
