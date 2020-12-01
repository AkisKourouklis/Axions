import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Player } from 'video-react';
import { publicApi } from '../../../config/api';

const SingleVideo = ({ data }) => {
  const [video, setVideo] = useState();

  const fetchVideo = () => {
    if (data) {
      axios
        .post(`${publicApi}/courses/s3/single`, { file: data })
        .then((response) => {
          setVideo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [data]);

  return (
    <>
      {data ? (
        <div className="player-wrapper">
          <Player playsInline src={video} />
        </div>
      ) : (
        <>
          <p>No Video is Playing</p>
          <div
            style={{
              border: '1px solid #dcdcdc',
              borderRadius: '4px',
              padding: '1rem'
            }}
          >
            <p>Select a video</p>
          </div>
        </>
      )}
    </>
  );
};

export default SingleVideo;
