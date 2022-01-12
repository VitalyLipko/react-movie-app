import { Fragment, useEffect, useRef, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import { MovieCard } from '../../components';
import { getPopular } from '../../adapters';
import './Popular.css';
import { usePageSearchParam } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, selectFavoriteIds } from '../../slices';

export default function Popular() {
  const [movies, setMovies] = useState(null);
  const [pageSearchParam, setPageSearchParam] = usePageSearchParam();
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);

  function onFavoriteStatusChange(id) {
    setMovies(
      movies.map((movie) => ({
        ...movie,
        isFavorite: movie.id === id ? !movie.isFavorite : movie.isFavorite,
      })),
    );
    dispatch(changeStatus(id));
  }

  function onPageChange(_, page) {
    setPageSearchParam(page);
  }

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const res = await getPopular(pageSearchParam, controller.signal);
        setMovies(
          res.results.map((movie) => ({
            ...movie,
            isFavorite: favoriteIds.includes(movie.id),
          })),
        );
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSearchParam]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.id),
      })),
    );
  }, [favoriteIds]);

  return (
    <Fragment>
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
      <Grid className="Popular-pagination-container" item>
        {movies && (
          <Pagination
            count={500}
            page={pageSearchParam}
            onChange={onPageChange}
          />
        )}
      </Grid>
    </Fragment>
  );
}
