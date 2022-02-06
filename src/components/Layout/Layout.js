import { AppBar, Grid, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavButton, PageProgress, Search } from '../index';
import { Fragment, Suspense } from 'react';
import { LayoutNavContainer, LayoutToolbarAppName } from './Layout.styled';

export default function Layout() {
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <LayoutToolbarAppName variant="h6">Movie App</LayoutToolbarAppName>
          <nav>
            <LayoutNavContainer>
              <li>
                <NavButton link="" label="Popular" />
              </li>
              <li>
                <NavButton link="favorites" label="Favorites" />
              </li>
            </LayoutNavContainer>
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
