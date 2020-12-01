import React, { useState } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '../../../SharedComponents/IconButton/IconButton';
import { logout } from '../../../../store/actions/auth.actions';

const Sidebar = ({ selectedTab }) => {
  const dispatch = useDispatch();
  const [showPop, setShowPop] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const authLogout = () => {
    dispatch(logout());
  };

  const handlePopoverOpen = () => {
    setShowPop(true);
  };

  const handlePopoverClose = () => {
    setTimeout(() => {
      setShowPop(false);
    }, 700);
  };
  return (
    <div className="sidebar">
      <IconButton
        icon={<HomeIcon style={{ fontSize: 30 }} />}
        title="Home"
        link="/"
        selectedTab={selectedTab}
        tab="home"
      />
      <IconButton
        icon={<LibraryBooksIcon style={{ fontSize: 30 }} />}
        title="Courses"
        tab="course"
        selectedTab={selectedTab}
        link="/courses/courses"
      />
      <IconButton
        icon={<LocalOfferIcon style={{ fontSize: 30 }} />}
        title="Promo Codes"
        tab="promoCodes"
        selectedTab={selectedTab}
        link="/promoCode/list"
      />
      <IconButton
        icon={<AttachMoneyIcon style={{ fontSize: 30 }} />}
        title="Sales"
        tab="sales"
        selectedTab={selectedTab}
        link="/earnings"
      />
      <IconButton
        icon={<SettingsIcon style={{ fontSize: 30 }} />}
        title="Settings"
        tab="settings"
        selectedTab={selectedTab}
        link="/settings"
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        className="userInfoSidebar"
        onMouseEnter={handlePopoverOpen}
      >
        <Typography style={{ color: '#fff' }}>
          <PersonIcon style={{ fontSize: 27, paddingTop: 8 }} />
        </Typography>
        <Typography
          style={{ paddingLeft: 20, fontWeight: 600, color: '#fff', fontSize: 16 }}
        >
          {user}
        </Typography>
        <div style={{ position: 'relative' }}>
          <Typography style={{ color: '#fff' }}>
            <ArrowForwardIosIcon
              className="hover"
              style={{ paddingLeft: 20, fontSize: 30, paddingTop: 6 }}
            />
          </Typography>
          {showPop ? (
            <>
              <div
                style={{
                  width: '250px',
                  height: '60px',
                  borderRadius: '5px',
                  border: '2px solid #dcdcdc',
                  background: '#fff',
                  position: 'absolute',
                  top: '-70px',
                  left: '80px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Grid container>
                  {/* LOGOUT */}
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center'
                    }}
                    className="hover"
                    onClick={authLogout}
                  >
                    <ExitToAppIcon
                      onClick={logout}
                      className="hover"
                      style={{
                        fontSize: 30,
                        paddingTop: 6,
                        color: '#090909'
                      }}
                    />
                    <Typography
                      style={{
                        fontSize: 16,
                        marginTop: 5,
                        marginLeft: '30px',
                        color: '#090909'
                      }}
                    >
                      Logout
                    </Typography>
                  </Grid>
                  <Grid style={{ marginTop: 5 }} item xs={12}>
                    <Divider />
                  </Grid>
                  {/* SETTINGS */}
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center'
                    }}
                    className="hover"
                  >
                    <SettingsIcon
                      onClick={logout}
                      className="hover"
                      style={{
                        fontSize: 30,
                        paddingTop: 6,
                        color: '#090909'
                      }}
                    />
                    <Typography
                      style={{
                        fontSize: 16,
                        marginTop: 5,
                        marginLeft: '30px',
                        color: '#090909'
                      }}
                    >
                      Account Settings
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
