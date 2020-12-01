import React, { useState } from 'react';
import { Collapse } from 'shards-react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Collapsable = ({ title, content }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <div
        className="collapsable-card hover"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}
        onClick={toggle}
      >
        <div style={{ marginRight: '10px' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }} className="hover">
            {title}
          </p>
        </div>
        <div style={{ marginTop: '-5px' }}>
          {collapse ? <FaArrowDown /> : <FaArrowUp />}
        </div>
      </div>
      <Collapse open={collapse} style={{ background: '#f1f1f1', marginBottom: '20px' }}>
        <div className="p-3 mt-3 border rounded">
          <span>{content}</span>
        </div>
      </Collapse>
    </>
  );
};

export default Collapsable;
