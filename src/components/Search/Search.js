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
import { Fragment, useEffect, useRef, useState } from 'react';
import { getSearchResults } from '../../adapters';
import { useLocation } from 'react-router-dom';
import { SearchResultItem } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres, changeStatus, selectFavoriteIds } from '../../slices';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const searchRef = useRef(null);
  const { pathname } = useLocation();
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const genres = useSelector(selectGenres);

  function onQueryChange(event) {
    setQuery(event.target.value);
  }

  function onPopoverClose() {
    setOpenPopover(false);
  }

  function onSearchClear() {
    setQuery('');
  }

  function searchResultsEnricher(movies) {
    return movies?.map((movie) => ({
      ...movie,
      isFavorite: favoriteIds.includes(movie.id),
      genres: movie.genre_ids.map((id) =>
        genres.find((genre) => genre.id === id),
      ),
    }));
  }

  useEffect(() => {
    setOpenPopover(!!query);
    if (!query) {
      setSearchResults(null);
      return;
    }
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const res = await getSearchResults(query, controller.signal);
        setSearchResults(searchResultsEnricher(res.results));
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setSearchResults((prevSearchResults) =>
      searchResultsEnricher(prevSearchResults),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteIds]);

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
