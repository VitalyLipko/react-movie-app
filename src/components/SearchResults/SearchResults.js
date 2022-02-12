import { CircularProgress, List, Typography } from '@mui/material';
import { SearchResultItem } from '../index';
import { useSelector } from 'react-redux';
import { selectGenres, selectFavoriteIds } from '../../store';
import { useCallback } from 'react';
import {
  SearchResultsEmpty,
  SearchResultsInProgress,
} from './SearchResults.styled';

export default function SearchResults(props) {
  const { movies } = props;
  const favoriteIds = useSelector(selectFavoriteIds);
  const genres = useSelector(selectGenres);
  const movieMapper = useCallback(
    (movie) => ({
      ...movie,
      isFavorite: favoriteIds.includes(movie.id),
      genres: movie.genre_ids.map((id) =>
        genres.find((genre) => genre.id === id),
      ),
    }),
    [favoriteIds, genres],
  );

  if (!movies) {
    return (
      <SearchResultsInProgress>
        <CircularProgress size={20} />
      </SearchResultsInProgress>
    );
  }

  return movies?.length ? (
    <List>
      {movies.map((movie) => (
        <SearchResultItem key={movie.id} movie={movieMapper(movie)} />
      ))}
    </List>
  ) : (
    <SearchResultsEmpty>
      <Typography component="span">No results</Typography>
    </SearchResultsEmpty>
  );
}
