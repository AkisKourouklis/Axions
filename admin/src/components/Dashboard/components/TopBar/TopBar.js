import React from 'react';
import { Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import moment from 'moment';

const TopBar = () => {
  return (
    <div className="topBar">
      <img alt="logo" src="/static/images/logo.png" className="logo" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography
          style={{
            color: '#1F2B39',
            fontSize: 18,
            paddingRight: 30,
            fontWeight: 400
          }}
        >
          {moment().format('dddd, DD MMMM')}
        </Typography>
        <Typography style={{ color: '#1F2B39' }}>
          <NotificationsIcon style={{ fontSize: 27, paddingRight: 30, paddingTop: 8 }} />
        </Typography>
      </div>
    </div>
  );
};

export default TopBar;
