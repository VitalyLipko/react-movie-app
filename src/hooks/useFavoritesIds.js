import { useEffect, useState } from 'react';
import { FAVORITES_STORAGE_KEY } from '../environments';

export default function useFavoritesIds() {
  const [favoritesIds, setFavoritesIds] = useState(
    JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  return [favoritesIds, setFavoritesIds];
}
