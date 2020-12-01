import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import { Button, Row, Col, Form, Card, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { apiUrl, axiosCallApi } from '../../../config/api';
import axios from 'axios';
import { useRouter } from 'next/router';

const Settings = () => {
  const [validVideo, setValidVideo] = useState(false);
  const [validVideo2, setValidVideo2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favicon, setFavicon] = useState(false);
  const [logo, setLogo] = useState(false);
  const [config, setConfig] = useState();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const _logout = () => {
    localStorage.clear();
    router.reload();
  };

  const fetchConfig = () => {
    setLoading(true);
    axiosCallApi
      .get(`${apiUrl}/config/all`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      })
      .then((response) => {
        setConfig(response.data[0]);
        setLoading(false);
        if (response.data[0]?.favicon) {
          axiosCallApi
            .post(`${apiUrl}/courses/s3/single`, { file: response.data[0].favicon })
            .then((response) => {
              setFavicon(response.data);
            });
        }
        if (response.data[0]?.logo) {
          axiosCallApi
            .post(`${apiUrl}/courses/s3/single`, { file: response.data[0].logo })
            .then((response) => {
              setLogo(response.data);
            });
        }
      });
  };

  const toggleValidVideo = (e) => {
    const fd = new FormData();
    fd.append('file', e.target.files[0]);

    axios.post(`${apiUrl}/courses/upload/${e.target.files[0].name}`, fd, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    });

    axios
      .patch(
        `${apiUrl}/config/config/${config?._id}`,
        {
          favicon: e.target.files[0].name,
          logo: config?.logo,
          metatitle: config?.metatitle,
          metadescription: config?.metadescription
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setLoading(false);
        setValidVideo(true);
        fetchConfig();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleValidVideo2 = (e) => {
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('file', e.target.files[0]);

    axios.post(`${apiUrl}/courses/upload/${e.target.files[0].name}`, fd, {
      headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    });

    axios
      .patch(
        `${apiUrl}/config/config/${config?._id}`,
        {
          favicon: config?.favicon,
          logo: e.target.files[0].name,
          metatitle: config?.metatitle,
          metadescription: config?.metadescription
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setLoading(false);
        setValidVideo(true);
        fetchConfig();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit create course
  const _handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    // HERE WE UPLOAD IMAGE TO AMAZON S3
    axios
      .patch(
        `${apiUrl}/config/config/${config?._id}`,
        {
          favicon: favicon[0]?.name || config?.favicon,
          logo: logo[0]?.name || config?.logo,
          metatitle: values.metatitle,
          metadescription: values.metadescription,
          frontUrl: values.frontUrl,
          adminUrl: values.adminUrl,
          live: values.live
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setLoading(false);
        fetchConfig();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Dashboard>
      <section>
        <Row className="mb-3">
          <Col xs="6">
            <h3>Ρυθμίσεις</h3>
          </Col>
          <Col xs="6" className="text-right">
            <Button onClick={_logout}>Αποσύνδεση</Button>
          </Col>
        </Row>
        {loading ? (
          <Spinner className="mb-1" animation="border" size="sm" />
        ) : (
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(_handleSubmit)} id="settings-form">
                <Row>
                  <Col xs="12" md="10">
                    <Form.Group>
                      <Form.Label>Favicon</Form.Label>
                      <Form.File
                        label="Ανέβασε μία εικόνα"
                        custom
                        isValid={validVideo}
                        onChange={toggleValidVideo}
                        ref={register()}
                        name="favicon"
                      />
                      {validVideo ? (
                        <p style={{ color: '#28a745' }}>Image uploaded!</p>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col xs="12" md="2">
                    <Card>
                      <Card.Body>
                        {favicon ? (
                          <img alt="favicon" src={favicon.toString()} width="100%" />
                        ) : null}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="10">
                    <Form.Group>
                      <Form.Label>Logo Resolution(150px X 30px)</Form.Label>
                      <Form.File
                        label="Ανέβασε μία εικόνα"
                        custom
                        isValid={validVideo2}
                        onChange={toggleValidVideo2}
                        ref={register()}
                        name="logo"
                      />
                      {validVideo2 ? (
                        <p style={{ color: '#28a745' }}>Image uploaded!</p>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col xs="12" md="2">
                    <Card>
                      <Card.Body>
                        {logo ? (
                          <img alt="favicon" src={logo.toString()} width="100%" />
                        ) : null}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Meta Τίτλος</Form.Label>
                        <Form.Control
                          placeholder="Τίτλος"
                          ref={register()}
                          name="metatitle"
                          defaultValue={config?.metatitle}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Meta Περιγραφή</Form.Label>
                        <Form.Control
                          placeholder="Τίτλος"
                          ref={register()}
                          name="metadescription"
                          defaultValue={config?.metadescription}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Url Ιστοσελίδας</Form.Label>
                        <Form.Control
                          placeholder="url"
                          ref={register()}
                          name="frontUrl"
                          defaultValue={config?.frontUrl}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Url Διαχειριστικού</Form.Label>
                        <Form.Control
                          placeholder="url"
                          ref={register()}
                          name="adminUrl"
                          defaultValue={config?.adminUrl}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Group>
                      <Form.Label>Ζωντανή ιστοσελίδα</Form.Label>
                      <Form.Control
                        name="live"
                        ref={register()}
                        as="select"
                        defaultValue={config?.live}
                      >
                        <option value="true">ΝΑΙ</option>
                        <option value="false">OXI</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button type="submit" form="settings-form">
                Αποθήκευση
              </Button>
            </Col>
          </Row>
        )}
      </section>
    </Dashboard>
  );
};

export default Settings;
