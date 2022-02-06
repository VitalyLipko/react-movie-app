import { CircularProgress, List, Typography } from '@mui/material';
import { SearchResultItem } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres, changeStatus, selectFavoriteIds } from '../../store';
import { useCallback } from 'react';
import {
  SearchResultsEmpty,
  SearchResultsInProgress,
} from './SearchResults.styled';

export default function SearchResults(props) {
  const { movies } = props;
  const dispatch = useDispatch();
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
  const onFavoriteStatusChange = (id) => dispatch(changeStatus(id));

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
        <SearchResultItem
          key={movie.id}
          movie={movieMapper(movie)}
          onFavoriteStatusChange={onFavoriteStatusChange}
        />
      ))}
    </List>
  ) : (
    <SearchResultsEmpty>
      <Typography component="span">No results</Typography>
    </SearchResultsEmpty>
  );
}
