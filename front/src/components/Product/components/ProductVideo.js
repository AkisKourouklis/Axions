import React, { useState, useEffect } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Modal, Row, Button, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { publicApi } from '../../../config/api';

const ProductVideo = ({ file }) => {
  const [video, setVideo] = useState();
  const [open, setOpen] = useState();

  const fetchVideo = () => {
    axios
      .post(`${publicApi}/subscribers/s3/single`, { file: file?.key })
      .then((response) => {
        setVideo(response.data);
      });
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchVideo();
  }, [file]);

  return (
    <>
      <Button onClick={toggleModal}>Δες το βίντεο</Button>
      <Modal show={open} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{file?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={video} controls width="100%" />
          <hr style={{ margin: '1rem 0' }} />
          <p>{file?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Έξοδος
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductVideo;
