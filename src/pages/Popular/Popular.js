import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { MovieCard } from '../../components';
import { getPopular } from '../../adapters';
import useFavoritesIds from '../../hooks/useFavoritesIds';

export default function Popular() {
  const [movies, setMovies] = useState(null);
  const [favoritesIds, setFavoritesIds] = useFavoritesIds();

  function onFavoriteStatusChange(id) {
    setMovies(
      movies.map((movie) => ({
        ...movie,
        isFavorite: movie.id === id ? !movie.isFavorite : movie.isFavorite,
      })),
    );
    setFavoritesIds(
      favoritesIds.includes(id)
        ? favoritesIds.filter((item) => item !== id)
        : [...favoritesIds, id],
    );
  }

  useEffect(() => {
    const controller = new AbortController();
    try {
      (async function fetchData() {
        const res = await getPopular(controller.signal);
        setMovies(
          res.results.map((movie) => ({
            ...movie,
            isFavorite: favoritesIds.includes(movie.id),
          })),
        );
      })();
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2} item p="16px 0 0 16px">
      {movies &&
        movies.map((movie) => (
          <Grid item key={movie.id.toString()}>
            <MovieCard
              movie={movie}
              onFavoriteStatusChange={onFavoriteStatusChange}
            />
          </Grid>
        ))}
    </Grid>
  );
}
