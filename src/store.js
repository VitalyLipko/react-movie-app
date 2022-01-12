import { configureStore } from '@reduxjs/toolkit';
import {
  FAVORITE_IDS_CHANGE_STATUS_ACTION,
  favoriteIdsReducer,
  selectFavoriteIds,
  genresReducer,
} from './slices';
import { FAVORITES_STORAGE_KEY } from './environments';

const favoritesStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === FAVORITE_IDS_CHANGE_STATUS_ACTION) {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(selectFavoriteIds(store.getState())),
    );
  }
  return result;
};
export default configureStore({
  reducer: { favoriteIds: favoriteIdsReducer, genres: genresReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesStorageMiddleware),
});
