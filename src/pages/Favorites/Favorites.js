import { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { MovieList } from '../../components';
import { getMovie } from '../../adapters';
import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../../store';
import { FavoritesStateContainer } from './Favorites.styled';

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
      <FavoritesStateContainer container item>
        <Grid item>
          <CircularProgress />
        </Grid>
      </FavoritesStateContainer>
    );
  }

  if (!favorites.length) {
    return (
      <FavoritesStateContainer container item>
        No favorites
      </FavoritesStateContainer>
    );
  }

  return <MovieList movies={favorites} onlyInitialTransition={false} />;
}
