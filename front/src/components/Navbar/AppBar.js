import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Button,
  Container,
  Card,
  Modal
} from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { publicApi } from '../../config/api';
import Join from '../Chat/Join';

const AppBar = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [_courses, setCourses] = useState([]);
  const [_SearchCourses, setSearchCourses] = useState([]);
  const [logo, setLogo] = useState();
  const [search, setSearch] = useState(false);
  const [filter, searchFilter] = useState('');
  const [show, setShow] = useState(false);

  const fetchConfig = () => {
    axios
      .get(`${publicApi}/config/all/client`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        if (response.data[0]?.logo) {
          axios
            .post(`${publicApi}/courses/s3/single`, { file: response.data[0]?.logo })
            .then((doc) => {
              setLogo(doc.data);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCourses = () => {
    axios
      .get(`${publicApi}/courses/all`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleSearch = () => {
    setSearch(!search);
  };

  const searchCourses = () => {
    axios
      .get(`${publicApi}/courses/all?filter=${filter}`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setSearchCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    searchFilter(e.target.value);
    searchCourses();
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const submitSearch = () => {
    setShow(true);
  };

  useEffect(() => {
    fetchCourses();
    fetchConfig();
  }, []);

  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark" expand="xl">
        <Container style={{ position: 'relative' }}>
          <Navbar.Brand href="/">
            <img src={logo} width="150px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Μαθήματα">
                {_courses.map((data) => {
                  return (
                    <NavDropdown.Item href={`/product?id=${data._id}`} key={data._id}>
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Nav.Link href="/contact">Επικοινωνία</Nav.Link>
              {auth ? (
                <>
                  <Nav.Link href="/account/mycourses">Λογαρισμός</Nav.Link>
                  <Nav.Link href="/checkout">Καλάθι</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/authentication/login">Σύνδεση</Nav.Link>
                  <Nav.Link href="/authentication/register">Εγγραφή</Nav.Link>
                </>
              )}
            </Nav>
            <FiSearch
              className="text-light hover mr-3"
              onClick={toggleSearch}
              style={{ fontSize: '20px' }}
            />
            <Join />
            <Form className={search ? 'search-form' : 'search-form-none'} inline>
              <IoMdClose
                className="text-dark hover mb-3 ml-auto tablet"
                onClick={toggleSearch}
                style={{ fontSize: '20px' }}
              />
              <FormControl
                type="text"
                onChange={handleSearch}
                placeholder="Αναζήτηση"
                className="mr-sm-2"
              />
              <Button
                className="search-button"
                onClick={submitSearch}
                variant="outline-success"
              >
                Αναζήτηση
              </Button>
            </Form>
            <Modal centered show={show} onHide={toggleShow}>
              <Modal.Header closeButton>
                <Modal.Title>Αποτελέσματα</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {_SearchCourses.map((data) => {
                  return (
                    <div key={data._id}>
                      <Link href={`/product?id=${data._id}`}>{data.name}</Link>
                    </div>
                  );
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleShow}>
                  Έξοδος
                </Button>
              </Modal.Footer>
            </Modal>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppBar;
