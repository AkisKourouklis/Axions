import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Spinner, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { fetchSingle } from '../../utils/Courses';
import Account from './Account';
import SingleVideo from './Components/SingleVideo';
import VideoList from './Components/VideoList';

const Course = () => {
  const router = useRouter();
  const [courseData, setCourse] = useState();
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const course = await fetchSingle(router.query.id);
    setCourse(course);
    setCurrentVideo(course?.videos[0].key);
    setCurrentDescription(course?.videos[0].description);
    setCurrentTitle(course?.videos[0].title);
    setLoading(false);
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
