import { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { MovieList } from '../../components';
import './Favorites.css';
import { getMovie } from '../../adapters';
import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../../store';

export default function Favorites() {
  const favoriteIds = useSelector(selectFavoriteIds);
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

  if (!favorites) {
    return (
      <Grid className="Favorites-progress" container item>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (!favorites.length) {
    return (
      <Grid className="Favorites-empty" container item>
        No favorites
      </Grid>
    );
  }

  return (
    <MovieList
      movies={favorites}
      cssProps={{ p: '16px 0 0 16px' }}
      onlyInitialTransition={false}
    />
  );
}
