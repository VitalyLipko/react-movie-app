import { useEffect, useRef, useState } from 'react';
import { API_KEY, API_PATH, FAVORITES_STORAGE_KEY } from '../environments';
import { CircularProgress, Grid } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
import './Favorites.css';

export default function Favorites() {
  const [favoritesIds, setFavoritesIds] = useState(
    JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  );
  const [favorites, setFavorites] = useState(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    (async function fetchData() {
      const res = await Promise.all(
        favoritesIds.map(async (favoriteId) => {
          const url = new URL(`${API_PATH}/${favoriteId}`);
          url.searchParams.append('api_key', API_KEY);
          const payload = await fetch(url.toString());
          const movie = await payload.json();
          return { ...movie, isFavorite: true };
        }),
      );
      setFavorites(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  function onFavoriteStatusChange(id) {
    setFavoritesIds(favoritesIds.filter((item) => item !== id));
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  }

  if (!favorites) {
    return (
      <Grid
        className="Favorites-progress"
        container
        justifyContent="center"
        alignItems="center"
        item
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (!favorites.length) {
    return (
      <Grid
        className="Favorites-empty"
        container
        justifyContent="center"
        alignItems="center"
        item
      >
        No favorites
      </Grid>
    );
  }

  return (
    <Grid container item spacing={2} p="16px 0 0 16px">
      {favorites.map((favorite) => (
        <Grid item key={favorite.id}>
          <MovieCard
            movie={favorite}
            onFavoriteStatusChange={onFavoriteStatusChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}
