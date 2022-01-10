import { configureStore } from '@reduxjs/toolkit';
import favoriteIdsReducer from '../features/favoriteIds/favoriteIdsSlice';

export default configureStore({ reducer: { favoriteIds: favoriteIdsReducer } });
