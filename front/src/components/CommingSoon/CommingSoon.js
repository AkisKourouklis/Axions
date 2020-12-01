import React from 'react';
import Main from '../Main';

const Contact = () => {
  return (
    <>
      <Main>
        <div
          style={{
            background: 'url(intro.png)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#090909' }}>Comming Soon</h1>
            <p style={{ color: '#090909' }}>
              Πολλά πράγματα ακόμα έρχονται, μέχρι τότε δες το Pre-Vulture
            </p>
            <div style={{ marginTop: '1rem' }}>
              <a href="/product?id=5eb19f2270441521249edad6">
                <button type="button" className="primary-button">
                  Pre-Vulture
                </button>
              </a>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Contact;
