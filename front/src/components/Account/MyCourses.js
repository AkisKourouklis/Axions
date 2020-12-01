import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Account from './Account';
import Tables from './Components/CoursesTables';
import { publicApi } from '../../config/api';

const MyCourse = () => {
  const [coursesData, setCourses] = useState();
  const id = useSelector((state) => state.auth.id);

  const fetchOnwedCourses = () => {
    axios
      .get(`${publicApi}/subscribers/client/${id}`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        axios
          .post(
            `${publicApi}/courses/courses/client`,
            { courses: response.data.courses },
            { headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') } }
          )
          .then((doc) => setCourses(doc.data));
      });
  };

  useEffect(() => {
    if (id) {
      fetchOnwedCourses();
    }
  }, [id]);

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
