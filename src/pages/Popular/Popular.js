import { Fragment, useEffect, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import { MovieCard } from '../../components';
import { getPopular } from '../../adapters';
import './Popular.css';
import { useFavoritesIds, usePageSearchParam } from '../../hooks';

export default function Popular() {
  const [movies, setMovies] = useState(null);
  const [favoritesIds, setFavoritesIds] = useFavoritesIds();
  const [pageSearchParam, setPageSearchParam] = usePageSearchParam();

  function onFavoriteStatusChange(id) {
    setMovies(
      movies.map((movie) => ({
        ...movie,
        isFavorite: movie.id === id ? !movie.isFavorite : movie.isFavorite,
      })),
    );
    setFavoritesIds(
      favoritesIds.includes(id)
        ? favoritesIds.filter((item) => item !== id)
        : [...favoritesIds, id],
    );
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
            isFavorite: favoritesIds.includes(movie.id),
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
