import React from 'react';
import Section3 from './Sections/Section3';
import Section1 from './Sections/Section1';
import Main from '../Main';
import Section2 from './Sections/Section2';
import Section4 from './Sections/Section4';
import Section5 from './Sections/Section5';
import Section6 from './Sections/Section6';
import Section7 from './Sections/Section7';

const Home = () => {
  return (
    <>
      <Main>
        <Section1 />
        <Section7 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </Main>
    </>
  );
};

export default Home;
