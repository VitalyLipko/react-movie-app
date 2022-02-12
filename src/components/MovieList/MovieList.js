import { Grid, Grow } from '@mui/material';
import { MovieCard } from '../index';
import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../../store';
import { useRef } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { MovieListContainer } from './MovieList.styled';

export default function MovieList(props) {
  const { movies, onlyInitialTransition = true, extraPaddings = true } = props;
  const isInitialTransition = useRef(true);
  const favoriteIds = useSelector(selectFavoriteIds);
  const movieMapper = (movie) => ({
    ...movie,
    isFavorite: favoriteIds.includes(movie.id),
  });
  const handleEndTransition = (index) => {
    if (
      onlyInitialTransition &&
      isInitialTransition.current &&
      index === movies.length
    ) {
      isInitialTransition.current = false;
    }
  };

  return (
    <MovieListContainer
      container
      item
      spacing={2}
      extraPaddings={extraPaddings}
    >
      <TransitionGroup
        component={null}
        enter={isInitialTransition.current}
        exit={isInitialTransition.current}
      >
        {movies.map((movie, index) => (
          <Grow
            key={movie.id}
            addEndListener={() => handleEndTransition(index + 1)}
            timeout={index * 80}
          >
            <Grid item>
              <MovieCard movie={movieMapper(movie)} />
            </Grid>
          </Grow>
        ))}
      </TransitionGroup>
    </MovieListContainer>
  );
}
