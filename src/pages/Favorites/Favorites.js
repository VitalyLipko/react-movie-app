import { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { MovieCard } from '../../components';
import './Favorites.css';
import { getMovie } from '../../adapters';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, selectFavoriteIds } from '../../slices';

export default function Favorites() {
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const res = await Promise.all(
          favoriteIds.map(async (favoriteId) => {
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
  }, [favoriteIds]);

  function onFavoriteStatusChange(id) {
    dispatch(changeStatus(id));
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
