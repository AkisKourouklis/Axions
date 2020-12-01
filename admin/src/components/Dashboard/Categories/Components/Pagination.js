import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComp = ({ changePage, skip }) => {
  return (
    <>
      <Pagination>
        <Pagination.Prev onClick={() => changePage('prev')} />
        <Pagination.Item key={skip} active={false}>
          {skip ? skip : '1'}
        </Pagination.Item>
        <Pagination.Next onClick={() => changePage('next')} />
      </Pagination>
    </>
  );
};

export default PaginationComp;
