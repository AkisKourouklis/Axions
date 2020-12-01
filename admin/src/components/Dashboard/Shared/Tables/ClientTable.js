import React from 'react';
import { Table, Button, Spinner, ButtonGroup, Card } from 'react-bootstrap';
import { MdEdit, MdEmail } from 'react-icons/md';

const Tables = ({ data, handleShowEdit, toggleShowNewsletter }) => {
  return (
    <>
      {data ? (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th className="desktop">#</th>
                  <th>Όνομα</th>
                  <th>Email</th>
                  <th>Γλώσσα</th>
                  <th>Τηλέφωνο</th>
                  <th>Μαθήματα</th>
                  <th>Εντολές</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, i) => {
                  return (
                    <tr key={data._id}>
                      <td className="desktop">{i}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.language}</td>
                      <td>{data.phone}</td>
                      <td>{data.courses?.length}</td>
                      <td>
                        <Button onClick={() => handleShowEdit(data._id)} className="mr-1">
                          <MdEdit />
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => toggleShowNewsletter(data.email)}
                        >
                          <MdEmail />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <Spinner className="mb-1" animation="border" size="sm" />
      )}
    </>
  );
};

export default Tables;
