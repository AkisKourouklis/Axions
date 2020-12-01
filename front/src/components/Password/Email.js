import React from 'react';
import Main from '../Main';
import Form from '../Navbar/Components/ResetEmailForm';

const Reset = () => {
  return (
    <>
      <Main>
        <div className="auth-container">
          <div style={{ background: '#f1f1f1', padding: '2rem', borderRadius: '5px' }}>
            <Form />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Reset;
