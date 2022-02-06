import {
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getSearchResults } from '../../adapters';
import { useLocation } from 'react-router-dom';
import { SearchResults } from '../index';
import { SearchInput, SearchPopper } from './Search.styled';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const searchRef = useRef(null);
  const { pathname } = useLocation();
  const onQueryChange = (event) => setQuery(event.target.value);
  const onPopoverClose = () => setOpenPopover(false);
  const onSearchClear = () => setQuery('');
  const InputStartAdornment = useMemo(
    () => (
      <InputAdornment position="start">
        <SearchOutlined />
      </InputAdornment>
    ),
    [],
  );
  const InputEndAdornment = useMemo(
    () => (
      <InputAdornment position="end">
        {query && (
          <IconButton aria-label="clear" onClick={onSearchClear}>
            <ClearOutlined />
          </IconButton>
        )}
      </InputAdornment>
    ),
    [query],
  );

  useEffect(() => {
    setOpenPopover(!!query);
    if (!query) {
      setSearchResults(null);
      return;
    }
    const controller = new AbortController();
    (async function () {
      try {
        const res = await getSearchResults(query, controller.signal);
        setSearchResults(res.results);
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

  return (
    <>
      <SearchInput
        ref={searchRef}
        startAdornment={InputStartAdornment}
        endAdornment={InputEndAdornment}
        placeholder="Search..."
        size="small"
        value={query}
        onChange={onQueryChange}
      />
      <ClickAwayListener onClickAway={onPopoverClose}>
        <SearchPopper
          open={openPopover}
          anchorEl={searchRef.current}
          onClose={onPopoverClose}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper className="Search-popperResults" elevation={3}>
                <SearchResults movies={searchResults} />
              </Paper>
            </Fade>
          )}
        </SearchPopper>
      </ClickAwayListener>
    </>
  );
}
