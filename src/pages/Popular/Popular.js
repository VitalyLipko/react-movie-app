import { useEffect, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import { MovieList } from '../../components';
import { getPopular } from '../../adapters';
import './Popular.css';
import { usePageSearchParam } from '../../hooks';

export default function Popular() {
  const [movies, setMovies] = useState(null);
  const [pageSearchParam, setPageSearchParam] = usePageSearchParam();

  function onPageChange(_, page) {
    setPageSearchParam(page);
  }

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const res = await getPopular(pageSearchParam, controller.signal);
        setMovies(res.results);
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
  }, [pageSearchParam]);

  return (
    <>
      {movies && (
        <MovieList movies={movies} cssProps={{ p: '16px 0 0 16px' }} />
      )}
      <Grid className="Popular-pagination-container" item>
        {movies && (
          <Pagination
            count={500}
            page={pageSearchParam}
            onChange={onPageChange}
          />
        )}
      </Grid>
    </>
  );
}
