import { useEffect, useRef, useState } from 'react';
import { FAVORITES_STORAGE_KEY } from '../../environments';
import { CircularProgress, Grid } from '@mui/material';
import { MovieCard } from '../../components';
import './Favorites.css';
import { getMovie } from '../../adapters';

export default function Favorites() {
  const [favoritesIds, setFavoritesIds] = useState(
    JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  );
  const [favorites, setFavorites] = useState(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const res = await Promise.all(
          favoritesIds.map(async (favoriteId) => {
            const movie = await getMovie(favoriteId, controller.signal);
            return { ...movie, isFavorite: true };
          }),
        );
        setFavorites(res);
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
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
