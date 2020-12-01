import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Container, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import VideoList from './Components/VideoList';
import { publicApi } from '../../config/api';
import Account from './Account';
import SingleVideo from './Components/SingleVideo';

const Course = () => {
  const router = useRouter();
  const [courseData, setCourse] = useState();
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    axios
      .get(`${publicApi}/courses/${router.query.id}`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setCourse(response.data.course);
        setCurrentVideo(response.data.course?.videos[0].key);
        setCurrentDescription(response.data.course?.videos[0].description);
        setCurrentTitle(response.data.course?.videos[0].title);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeVideo = (key, description, title) => {
    setCurrentVideo(key);
    setCurrentDescription(description);
    setCurrentTitle(title);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Account>
        <Container
          className="bg-light pt-2 pb-2 pt-xl-5 pb-xl-5"
          style={{ minHeight: 'calc(100vh - 65px)' }}
        >
          <Row>
            <Col className="mt-1" xs="12" xl="6">
              {loading ? <Spinner /> : <SingleVideo data={currentVideo} />}
              <Card className="mt-1">
                <Card.Header>{currentTitle}</Card.Header>
                <Card.Body>{currentDescription}</Card.Body>
              </Card>
            </Col>
            <Col style={{ maxHeight: '400px', overflowY: 'scroll' }} xs="12" xl="6">
              <VideoList courseData={courseData} setCurrentVideo={changeVideo} />
            </Col>
          </Row>
        </Container>
      </Account>
    </>
  );
};

export default Course;
