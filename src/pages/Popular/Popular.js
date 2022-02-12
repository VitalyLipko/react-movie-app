import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { MovieList } from '../../components';
import { getPopular } from '../../adapters';
import { usePageSearchParam } from '../../hooks';
import { PopularPaginationContainer } from './Popular.styled';

export default function Popular() {
  const [movies, setMovies] = useState(null);
  const [pageSearchParam, setPageSearchParam] = usePageSearchParam();
  const onPageChange = useCallback(
    (_, page) => setPageSearchParam(page),
    [setPageSearchParam],
  );

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
      {movies && <MovieList movies={movies} />}
      <PopularPaginationContainer item>
        {movies && (
          <Pagination
            count={500}
            page={pageSearchParam}
            onChange={onPageChange}
          />
        )}
      </PopularPaginationContainer>
    </>
  );
}
