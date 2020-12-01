import React, { useState, useEffect, useContext } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Button,
  Container,
  Modal
} from 'react-bootstrap';
import { AuthContext } from '../../store/Context/Context';
import { BsPersonFill, BsFillBagFill } from 'react-icons/bs';
import { fetchConfig, fetchLogo } from '../../utils/Config';
import { fetchCourses } from '../../utils/Courses';
import { fetchNavbarDesign } from '../../utils/Design';
import { fetchProducts } from '../../utils/Products';
import { IoMdClose } from 'react-icons/io';
import Join from '../Chat/Join';
import Link from 'next/link';

const AppBar = () => {
  const { auth } = useContext(AuthContext);
  const [searchCourses, setSearchCourses] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [logo, setLogo] = useState();
  const [courses, setCourses] = useState();
  const [config, setConfig] = useState();
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [design, setDesign] = useState();

  const toggleSearch = () => {
    setSearch(!search);
  };

  const handleSearch = async (e) => {
    if (design[0]?.navbar?.searchType === 'product') {
      const _products = await fetchProducts(e.target.value);
      setSearchProducts(_products);
    } else {
      const _courses = await fetchCourses(e.target.value);
      setSearchCourses(_courses);
    }
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const submitSearch = () => {
    setShow(true);
  };
  const fetchStart = async () => {
    const _courses = await fetchCourses('');
    const _config = await fetchConfig();
    const _logo = await fetchLogo(_config?.logo);
    const _design = await fetchNavbarDesign();

    setConfig(_config);
    setCourses(_courses);
    setLogo(_logo);
    setDesign(_design);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <>
      {design ? (
        <>
          <Navbar bg="light" variant="dark" className="p-0 desktop">
            <Container>
              <Nav className="ml-auto">
                <Nav.Link className="border-right mr-2 pr-2 p-1">
                  <span className="text-dark" style={{ fontSize: '13px' }}>
                    FAQ
                  </span>
                </Nav.Link>
                <Nav.Link className="p-1">
                  <img
                    alt="greece"
                    src="/greece.svg"
                    width="20px"
                    className="rounded-pill border mr-3"
                  />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Navbar bg="dark" variant="dark" expand="xl">
            <Container style={{ position: 'relative' }}>
              <Navbar.Brand href="/">
                <img src={logo} width="170px" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  {courses ? (
                    <NavDropdown title="Μαθήματα">
                      {courses?.map((data) => {
                        return (
                          <NavDropdown.Item
                            href={`/product?id=${data._id}`}
                            key={data._id}
                          >
                            {data.name}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  ) : null}
                  <Nav.Link href="/catalog">Προιόντα</Nav.Link>
                </Nav>
                <Nav
                  className="w-100  mx-auto  mt-3 mt-xl-0"
                  style={{ maxWidth: '780px' }}
                >
                  <Form className="w-100 d-flex">
                    <Form.Control
                      onChange={handleSearch}
                      placeholder="Βρές τα προιόντα που θες..."
                      type="text"
                      style={{ borderRadius: '30px 0 0 30px' }}
                    />
                    <Button
                      type="button"
                      onClick={submitSearch}
                      style={{ borderRadius: '0px 30px 30px 0px' }}
                    >
                      Αναζήτηση
                    </Button>
                  </Form>
                </Nav>
                <Nav
                  className="d-flex align-items-center justify-content-between mt-3 mt-xl-0"
                  style={{ flexDirection: 'row' }}
                >
                  {auth.isAuthenticated ? (
                    <>
                      <Nav.Link href="/account/mycourses">
                        <BsPersonFill
                          className="mr-3 icon"
                          style={{ color: '#fff', fontSize: '27px' }}
                        />
                      </Nav.Link>
                      <Nav.Link href="/checkout">
                        <BsFillBagFill
                          className="mr-4 icon"
                          style={{ color: '#fff', fontSize: '25px' }}
                        />
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/authentication/login">Σύνδεση</Nav.Link>
                      <Nav.Link href="/authentication/register" className="mr-3">
                        Εγγραφή
                      </Nav.Link>
                    </>
                  )}
                  <Join />
                </Nav>
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
                    {design[0].navbar.searchType === 'product' ? (
                      <>
                        {searchProducts?.map((data) => {
                          return (
                            <div key={data._id}>
                              <Link href={`/product?id=${data._id}`}>
                                <a>{data.title}</a>
                              </Link>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {searchCourses?.map((data) => {
                          return (
                            <div key={data._id}>
                              <Link href={`/product?id=${data._id}`}>
                                <a>{data.name}</a>
                              </Link>
                            </div>
                          );
                        })}
                      </>
                    )}
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
          <Navbar className="justify-content-center p-3 bg-dark-black" variant="light">
            <Nav className="text-light text-center" style={{ flexDirection: 'column' }}>
              <h1 className="promo-text">Κέρδισε τώρα!</h1>
              <p style={{ fontStyle: 'italic' }}>
                Με τον κωδικό PROMO2 πάρε έκπτωση 20% σε όλα τα προιόντα
              </p>
            </Nav>
          </Navbar>
        </>
      ) : null}
    </>
  );
};

export default AppBar;
