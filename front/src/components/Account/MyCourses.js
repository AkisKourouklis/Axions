import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Account from './Account';
import Tables from './Components/CoursesTables';
import { AuthContext } from '../../store/Context/Context';
import { fetchOnwedCourses } from '../../utils/Courses';

const MyCourse = () => {
  const [coursesData, setCourses] = useState();
  const { auth } = useContext(AuthContext);

  const _fetchOnwedCourses = async () => {
    const courses = await fetchOnwedCourses(auth.id);
    setCourses(courses);
  };

  useEffect(() => {
    if (auth.id) {
      _fetchOnwedCourses();
    }
  }, [auth.id]);

  return (
    <>
      <Account>
        <Container className="bg-light pb-5 pt-5">
          <h3>Τα μαθήματα σου</h3>
          <Tables courses={coursesData} />
        </Container>
      </Account>
    </>
  );
};

export default MyCourse;
