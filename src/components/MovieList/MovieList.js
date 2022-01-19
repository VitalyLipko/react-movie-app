import { Grid } from '@mui/material';
import { MovieCard } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, selectFavoriteIds } from '../../store';
import { useCallback } from 'react';

export default function MovieList(props) {
  const { movies } = props;
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const movieMapper = useCallback(
    (movie) => ({ ...movie, isFavorite: favoriteIds.includes(movie.id) }),
    [favoriteIds],
  );
  const onFavoriteStatusChange = (id) => dispatch(changeStatus(id));

  return (
    <Grid container item spacing={2} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard
            movie={movieMapper(movie)}
            onFavoriteStatusChange={onFavoriteStatusChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}