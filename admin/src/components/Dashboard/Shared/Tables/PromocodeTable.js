import React from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';

const PromocodeTable = ({ codes, handleShowDelete, handleShowΕdit, setCodeId }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th className="desktop">#</th>
                <th>Όνομα</th>
                <th>Τις %</th>
                <th>Τιμή</th>
                <th>Μαθήματα</th>
                <th>Εντολές</th>
              </tr>
            </thead>
            <tbody>
              {codes?.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <td className="desktop">{i}</td>
                    <td>{data.name}</td>
                    <td>{data.isPercentage.toString()}</td>
                    <td>{data.value}</td>
                    <td>{data.appliesOn}</td>
                    <td>
                      <Button
                        className="mr-1"
                        onClick={() => {
                          handleShowΕdit();
                          setCodeId(data._id);
                        }}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleShowDelete();
                          setCodeId(data._id);
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default React.memo(PromocodeTable);
