import React from 'react';
import { Accordion, Card, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';

const AddOptionValueCard = ({
  data,
  removeOption,
  setOptionId,
  newOptionValue,
  removeOptionValue
}) => {
  const { register, handleSubmit } = useForm();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Διαγραφή</Popover.Title>
      <Popover.Content>
        <Button onClick={() => removeOption(data._id)} type="button" variant="danger">
          Οριστική διαγραφή
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Accordion>
        <Card className="mt-2">
          <Card.Header className="d-flex align-items-center">
            <span>{data.name}</span>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button variant="danger" className="ml-auto" type="button">
                <MdDelete />
              </Button>
            </OverlayTrigger>
            <Accordion.Toggle as={Button} className="p-0" variant="link" eventKey="1">
              <span type="button" className="btn btn-secondary btn-block">
                <FiPlus />
              </span>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card style={{ borderRadius: '0' }}>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit(newOptionValue)}
                  id={`options-values-form-${data._id}`}
                >
                  <Form.Group>
                    <Form.Label>Όνομα</Form.Label>
                    <Form.Control
                      ref={register()}
                      type="text"
                      name="name"
                      placeholder="Όνομα"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Απόθεμα</Form.Label>
                    <Form.Control
                      ref={register()}
                      type="number"
                      name="stock"
                      placeholder="Απόθεμα"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="secondary"
                    form={`options-values-form-${data._id}`}
                    onClick={() => setOptionId(data._id)}
                  >
                    Αποθήκευση
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Accordion.Collapse>
          <Card.Body>
            {data.values.map((doc) => {
              return (
                <Card className="mt-1" key={doc._id}>
                  <Card.Body className="d-flex align-items-center">
                    <span>
                      <strong>{doc.name}</strong> / Απόθεμα:{doc.stock}
                    </span>
                    <Button
                      onClick={() => removeOptionValue(doc._id, data._id)}
                      variant="danger"
                      className="ml-auto"
                    >
                      <MdDelete />
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Card.Body>
        </Card>
      </Accordion>
    </>
  );
};

export default AddOptionValueCard;
