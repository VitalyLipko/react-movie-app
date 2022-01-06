import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavButton } from '../index';
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
              <li>
                <NavButton link="favorites" label="Favorites" />
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container>
        <Outlet />
      </Grid>
    </Fragment>
  );
}
