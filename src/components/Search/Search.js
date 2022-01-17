import {
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  List,
  OutlinedInput,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import './Search.css';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { getSearchResults } from '../../adapters';
import { useLocation } from 'react-router-dom';
import { SearchResultItem } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres, changeStatus, selectFavoriteIds } from '../../store';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [rawSearchResults, setRawSearchResults] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const searchRef = useRef(null);
  const { pathname } = useLocation();
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const genres = useSelector(selectGenres);
  const searchResultsEnricher = useCallback(
    (movies) =>
      movies?.map((movie) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.id),
        genres: movie.genre_ids.map((id) =>
          genres.find((genre) => genre.id === id),
        ),
      })),
    [favoriteIds, genres],
  );

  function onQueryChange(event) {
    setQuery(event.target.value);
  }

  function onPopoverClose() {
    setOpenPopover(false);
  }

  function onSearchClear() {
    setQuery('');
  }

  useEffect(() => {
    setOpenPopover(!!query);
    if (!query) {
      setRawSearchResults(null);
      return;
    }
    const controller = new AbortController();
    (async function () {
      try {
        const res = await getSearchResults(query, controller.signal);
        setRawSearchResults(res.results);
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setSearchResults(searchResultsEnricher(rawSearchResults));
  }, [rawSearchResults, searchResultsEnricher]);

  return (
    <Fragment>
      <OutlinedInput
        className="Search"
        ref={searchRef}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {query && (
              <IconButton aria-label="clear" onClick={onSearchClear}>
                <ClearOutlined />
              </IconButton>
            )}
          </InputAdornment>
        }
        placeholder="Search..."
        size="small"
        value={query}
        onChange={onQueryChange}
      />
      <ClickAwayListener onClickAway={onPopoverClose}>
        <Popper
          className="Search-popper"
          open={openPopover}
          anchorEl={searchRef.current}
          onClose={onPopoverClose}
        >
          <Paper className="Search-popper-results" elevation={3}>
            {searchResults?.length ? (
              <List>
                {searchResults.map((movie) => (
                  <SearchResultItem
                    key={movie.id}
                    movie={movie}
                    onFavoriteStatusChange={(id) => dispatch(changeStatus(id))}
                  />
                ))}
              </List>
            ) : !searchResults ? (
              <Box className="Search-popper-in-progress">
                <CircularProgress size={20} />
              </Box>
            ) : (
              <Box className="Search-popper-no-results">
                <Typography component="span">No results</Typography>
              </Box>
            )}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </Fragment>
  );
}
