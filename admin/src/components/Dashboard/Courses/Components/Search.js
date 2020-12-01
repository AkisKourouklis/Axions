import React from 'react';
import { FormControl } from 'react-bootstrap';

const Search = ({ onChange }) => {
  return (
    <>
      <FormControl
        onChange={onChange}
        type="text"
        placeholder="Αναζήτηση"
        className="mb-1"
      />
    </>
  );
};

export default React.memo(Search);
