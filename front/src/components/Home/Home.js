import React from 'react';
import Section1 from './Sections/Section1';
import Main from '../Main';
import Section2 from './Sections/Section2';
import Section5 from './Sections/Section5';
import Section7 from './Sections/Section7';

const Home = () => {
  return (
    <>
      <Main>
        <Section1 />
        <Section2 />
        <Section7 />
        {/* <Section4 /> */}
        <Section5 />
        {/* <Section3 /> */}
        {/* <Section6 /> */}
      </Main>
    </>
  );
};

export default Home;
