import { lazy } from 'react';

export const Favorites = lazy(() => import('./Favorites/Favorites'));
export const Movie = lazy(() => import('./Movie/Movie'));
export const Popular = lazy(() => import('./Popular/Popular'));
