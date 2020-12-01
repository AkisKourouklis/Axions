import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { Spinner, Row, Button, Col, Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { FiPlus } from 'react-icons/fi';
import Dashboard from '../Dashboard';
import CourseAdd from './Components/CourseAdd';
import CourseEdit from './Components/CourseEdit';
import CourseAddVideo from './Components/CourseAddVideo';
import Alert from '../Alerts/Alert';
import { apiUrl } from '../../../config/api';

const Tables = dynamic(() => import('./Components/Tables'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Pagination = dynamic(() => import('./Components/Pagination'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Search = dynamic(() => import('./Components/Search'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const Courses = () => {
  const [courses, setCourses] = useState();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
  const [courseId, setCourseId] = useState();
  const handleShow = () => setShow(!show);

  // delete modal
  const handleShowDelete = (id) => {
    setCourseId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };

  // edit modal
  const handleShowEdit = (id) => {
    setCourseId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };

  // addVideo modal
  const handleShowAddVideo = (id) => {
    setCourseId(id);
    setShowAddVideo(true);
  };
  const hideAddVideo = () => {
    setShowAddVideo(false);
  };

  // fetch courses
  const fetchCourses = () => {
    Axios.get(`${apiUrl}/courses/all?perPage=5&skip=${skip}&filter=${filter}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    }).then((response) => {
      setCourses(response.data);
    });
  };

  // change page and searh function
  const changePage = useCallback(
    (type) => {
      if (type === 'next') {
        setSkip(skip + 1);
      } else {
        setSkip(skip - 1);
      }
    },
    [skip, setSkip]
  );
  const changeFilter = useCallback(
    (text) => {
      setFilter(text.target.value);
    },
    [setFilter]
  );

  // toggle alertttttt
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  // submit create course
  const handleSubmit = (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('file', values.image[0]);
    // HERE WE UPLOAD IMAGE TO AMAZON S3
    Axios.post(`${apiUrl}/courses/upload/${values.image[0].name}`, fd, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    }).then((response) => {
      const {
        name,
        description,
        option1,
        option2,
        option3,
        option4,
        option5,
        visible,
        price
      } = values;
      // HERE WE UPLOAD COURSE FIELDS TO API WITH RESPONSE BEEING THE IMAGE LOCATION
      Axios.post(`${apiUrl}/courses/new`, {
        name,
        description,
        options: [
          { name: option1 },
          { name: option2 },
          { name: option3 },
          { name: option4 },
          { name: option5 }
        ],
        visible,
        price,
        image: response.data
      })
        .then(() => {
          setLoading(false);
          setShow(false);
          toggleAlert();
          fetchCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // submit edit course
  const handleSubmitEdit = (values) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('file', values.image[0]);

    if (values?.image[0]?.name) {
      // HERE WE UPLOAD IMAGE TO AMAZON S3
      Axios.post(`${apiUrl}/courses/upload/${values.image[0].name}`, fd, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      }).then((response) => {
        const {
          name,
          description,
          option1,
          option2,
          option3,
          option4,
          option5,
          visible,
          price
        } = values;
        Axios.patch(`${apiUrl}/courses/${courseId}`, {
          name,
          description,
          options: [
            { name: option1 },
            { name: option2 },
            { name: option3 },
            { name: option4 },
            { name: option5 }
          ],
          visible,
          price,
          image: response.data
        })
          .then(() => {
            setLoading(false);
            setShowEdit(false);
            toggleAlert();
            fetchCourses();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    Axios.patch(`${apiUrl}/courses/${courseId}`, {
      name: values.name,
      description: values.description,
      options: [
        { name: values.option1 },
        { name: values.option2 },
        { name: values.option3 },
        { name: values.option4 },
        { name: values.option5 }
      ],
      visible: values.visible,
      price: values.price,
      image: values.imageUrl
    })
      .then(() => {
        setLoading(false);
        setShowEdit(false);
        toggleAlert();
        fetchCourses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit addVideo
  const handleSubmitAddVideo = (values) => {
    const fd = new FormData();
    fd.append('file', values.video[0]);
    setLoading(true);

    // HERE WE UPLOAD VIDEO TO AMAZON S3
    Axios.post(`${apiUrl}/courses/upload/${values.video[0].name}`, fd, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    }).then((response) => {
      Axios.post(
        `${apiUrl}/courses/video/${courseId}`,
        {
          title: values.title,
          description: values.description,
          isIntro: values.isIntro,
          url: response.data,
          key: values.video[0].name,
          isPreviable: values.isPreviable
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
        .then(() => {
          setLoading(false);
          setShowAddVideo(false);
          toggleAlert();
          fetchCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // submit delete course
  const deleteCourse = () => {
    // setLoading(true);
    // Axios.post(`${apiUrl}/courses/delete/${courseId}`).then((response) => {
    //   console.log(response.data);
    //   setLoading(false);
    //   hideDelete();
    //   toggleAlert();
    // });
    console.log('Delete');
  };

  useEffect(() => {
    fetchCourses();
  }, [skip, filter]);

  return (
    <>
      <Dashboard>
        {alert ? <Alert message="Επιτυχία" /> : null}
        {/* OPTIONS */}
        <Row className="mb-3">
          <Col xs="12" xl="6">
            <h3>Σειρές μαθημάτων</h3>
          </Col>
          {/* DESKTOP */}
          <Col className="text-right desktop" xs="12" xl="6">
            <Button className="d-flex align-items-center ml-auto" onClick={handleShow}>
              <FiPlus className="mr-1" />
              Προσθήκη μαθήματος
            </Button>
          </Col>
          {/* TABLET */}
          <Col className="text-right tablet" xs="12" xl="6">
            <Button
              className="d-flex align-items-center ml-auto"
              block
              onClick={handleShow}
            >
              <FiPlus className="mr-1" />
              Προσθήκη μαθήματος
            </Button>
          </Col>
        </Row>
        {/* SEARCH */}
        <Search onChange={changeFilter} />
        {/* TABLE */}
        <Tables
          courses={courses?.courses}
          handleShowEdit={handleShowEdit}
          handleShowDelete={handleShowDelete}
          handleShowAddVideo={handleShowAddVideo}
        />
        {/* PAGINATION */}
        <Pagination changePage={changePage} skip={skip} />
        {/* MODAL ADD COURSE */}
        <Modal show={show} onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Προσθήκη νέου μαθήματος</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CourseAdd submit={handleSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Έξοδος
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="addCourse-form"
              disabled={loading}
            >
              {loading ? <>Περιμένετε</> : <>Δημιουργία νέου μαθήματος</>}
            </Button>
          </Modal.Footer>
        </Modal>
        {/* MODAL DELETE COURSE */}
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
        {/* MODAL EDIT COURSE */}
        <Modal show={showEdit} onHide={hideEdit} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Επεξεργασία μαθήματος</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CourseEdit id={courseId} submit={handleSubmitEdit} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideEdit}>
              Έξοδος
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="editCourse-form"
              disabled={loading}
            >
              {loading ? <>Περιμένετε</> : <>Αποθήκευση μαθήματος</>}
            </Button>
          </Modal.Footer>
        </Modal>
        {/* MODAL ADD VIDEO COURSE */}
        <Modal show={showAddVideo} onHide={hideAddVideo} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Προσθήκη βίντεο</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CourseAddVideo id={courseId} submit={handleSubmitAddVideo} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideAddVideo}>
              Έξοδος
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="addVideoCourse-form"
              disabled={loading}
            >
              {loading ? <>Περιμένετε</> : <>Αποθήκευση βίντεο</>}
            </Button>
          </Modal.Footer>
        </Modal>
      </Dashboard>
    </>
  );
};

export default Courses;
