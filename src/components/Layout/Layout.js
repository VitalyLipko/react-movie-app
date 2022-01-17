import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavButton, PageProgress, Search } from '../index';
import { Fragment, Suspense } from 'react';
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
          <Search />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Suspense fallback={<PageProgress />}>
        <Grid container>
          <Outlet />
        </Grid>
      </Suspense>
    </Fragment>
  );
}
