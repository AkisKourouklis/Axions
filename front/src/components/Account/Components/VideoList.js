import React from 'react';
import { Row, Card } from 'react-bootstrap';

const VideoList = ({ courseData, setCurrentVideo }) => {
  return (
    <>
      <Row type="flex">
        {/* Εισαγωγή */}
        <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Εισαγωγή</p>
            {courseData?.videos
              ?.filter((data) => data.section === 'Εισαγωγή')
              .map((doc) => (
                <div key={doc._id} style={{ order: `${doc.order}` }} className="mb-1">
                  <Card
                    className="hover"
                    onClick={() => setCurrentVideo(doc.key, doc.description, doc.title)}
                  >
                    <Card.Body className="bold">{doc.title}</Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        {/* Επίγνωση */}
        <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Επίγνωση</p>
            {courseData?.videos
              ?.filter((data) => data.section === 'Επίγνωση')
              .map((doc) => (
                <div key={doc._id} style={{ order: `${doc.order}` }} className="mb-1">
                  <Card
                    className="hover"
                    onClick={() => setCurrentVideo(doc.key, doc.description, doc.title)}
                  >
                    <Card.Body className="bold">{doc.title}</Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        {/* Συνειδητό μυαλό */}
        <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Συνειδητό μυαλό</p>
            {courseData?.videos
              ?.filter((data) => data.section === 'Συνειδητό μυαλό')
              .map((doc) => (
                <div key={doc._id} style={{ order: `${doc.order}` }} className="mb-1">
                  <Card
                    className="hover"
                    onClick={() => setCurrentVideo(doc.key, doc.description, doc.title)}
                  >
                    <Card.Body className="bold">{doc.title}</Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        {/* Υποσυνείδητο μυαλό */}
        <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Υποσυνείδητο μυαλό</p>
            {courseData?.videos
              ?.filter((data) => data.section === 'Υποσυνείδητο μυαλό')
              .map((doc) => (
                <div key={doc._id} style={{ order: `${doc.order}` }} className="mb-1">
                  <Card
                    className="hover"
                    onClick={() => setCurrentVideo(doc.key, doc.description, doc.title)}
                  >
                    <Card.Body className="bold">{doc.title}</Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        {/* Αποφώνηση */}
        <div style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Αποφώνηση</p>
            {courseData?.videos
              ?.filter((data) => data.section === 'Αποφώνηση')
              .map((doc) => (
                <div key={doc._id} style={{ order: `${doc.order}` }} className="mb-1">
                  <Card
                    className="hover"
                    onClick={() => setCurrentVideo(doc.key, doc.description, doc.title)}
                  >
                    <Card.Body className="bold">{doc.title}</Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </Row>
    </>
  );
};

export default VideoList;
