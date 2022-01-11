import { configureStore } from '@reduxjs/toolkit';
import favoriteIdsReducer, {
  selectFavoriteIds,
} from '../features/favoriteIds/favoriteIdsSlice';
import { FAVORITES_STORAGE_KEY } from '../environments';

const favoritesStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'favoriteIds/changeStatus') {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(selectFavoriteIds(store.getState())),
    );
  }
  return result;
};
export default configureStore({
  reducer: { favoriteIds: favoriteIdsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesStorageMiddleware),
});
