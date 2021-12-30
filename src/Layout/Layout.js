import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import React, { Fragment } from 'react';
import './Layout.css';

export default function Layout() {
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Typography className="Layout-toolbar-app-name" variant="h6">
            Movie App
          </Typography>
          <nav className="Layout-toolbar-navigation">
            <ul>
              <li>
                <NavButton link="" label="Popular" />
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </Fragment>
  );
}
