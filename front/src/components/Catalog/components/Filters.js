import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { CatalogContext } from '../../../store/Context/Context';
import { fetchCategories } from '../../../utils/Categories';

const Filters = () => {
  const [category, setCategory] = useState();
  const { register, handleSubmit } = useForm();
  const { setCatalogFilters } = useContext(CatalogContext);

  const submit = (values) => {
    console.log(values);
    setCatalogFilters({
      filter: values.gender,
      filter2: values.type,
      filter3: values.brand,
      filter4: values.color,
      filter5: ''
    });
  };

  const clear = () => {
    setCatalogFilters({
      filter: '',
      filter2: '',
      filter3: '',
      filter4: '',
      filter5: ''
    });
  };

  const fetchStart = async () => {
    const response = await fetchCategories('100');
    setCategory(response);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <Navbar className="bg-gray">
      <Container>
        <Form className="mx-auto" onSubmit={handleSubmit(submit)}>
          <Row>
            <Col>
              <Form.Control
                style={{ maxWidth: '150px' }}
                ref={register()}
                as="select"
                name="gender"
              >
                <option value="">Φύλο</option>
                <option value="men">Ανδρικά</option>
                <option value="women">Γυναικεία</option>
                <option value="kid">Παιδικά</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                style={{ maxWidth: '150px' }}
                ref={register()}
                as="select"
                name="type"
              >
                <option value="">Τύπος</option>
                {category?.map((data) => {
                  return <option key={data._id}>{data.name}</option>;
                })}
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                style={{ maxWidth: '150px' }}
                as="select"
                ref={register()}
                name="brand"
              >
                <option value="">Μάρκα</option>
                <option value="Minerva">Minerva</option>
                <option value="Med">Med</option>
                <option value="Apple">Apple</option>
                <option value="Nina Club">Nina Club</option>
                <option value="HR Underware">HR Underware</option>
                <option value="Calvin Clain">Calvin Clain</option>
                <option value="Tommy">Tommy</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                style={{ maxWidth: '150px' }}
                ref={register()}
                as="select"
                name="color"
              >
                <option value="">Χρώμα</option>
                <option value="Αμάνικα">Άπρο</option>
                <option value="Κοντομάνικα">Μαύρο</option>
                <option value="Εσώρουχα">Κίτρινο</option>
                <option value="Εσώρουχα">Πολύχρομο</option>
                <option value="Κάλτσες">Μπλέ</option>
                <option value="Μαγιό">Ρόζ</option>
                <option value="Εσώρουχα">Μόβ</option>
              </Form.Control>
            </Col>

            <Col>
              <Button block type="submit">
                Αναζήτηση
              </Button>
            </Col>
            <Col>
              <Button block variant="secondary" onClick={clear} type="button">
                Καθαρισμός
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Filters;
