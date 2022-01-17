import { Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import './Movie.css';
import { FavoriteAction, MovieCard } from '../../components';
import { getMovie, getRecommendations } from '../../adapters';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, selectFavoriteIds } from '../../store';
import { getVoteBadgeColor } from '../../utils';

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const isInitialRender = useRef(true);
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const background = () =>
    movie.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) top center`
      : undefined;

  function onFavoriteStatusChange(id) {
    dispatch(changeStatus(id));
  }

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const [movieRes, recommendationsRes] = await Promise.all([
          getMovie(params.id, controller.signal),
          getRecommendations(params.id, controller.signal),
        ]);

        setMovie({
          ...movieRes,
          isFavorite: favoriteIds.includes(movieRes.id),
        });
        setRecommendations(
          recommendationsRes.results.map((recommendation) => ({
            ...recommendation,
            isFavorite: favoriteIds.includes(recommendation.id),
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
  }, [params.id]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((recommendation) => ({
        ...recommendation,
        isFavorite: favoriteIds.includes(recommendation.id),
      })),
    );
    setMovie((prevMovie) => ({
      ...prevMovie,
      isFavorite: favoriteIds.includes(prevMovie.id),
    }));
  }, [favoriteIds]);

  return (
    movie && (
      <Fragment>
        <Grid
          item
          className="Movie-backdrop-container"
          sx={{ background: background() }}
        />
        <Grid
          container
          item
          wrap="nowrap"
          flexDirection="column"
          className="Movie-main-info-container"
        >
          <Grid
            container
            item
            alignItems="center"
            wrap="nowrap"
            className="Movie-main-info-container-header"
          >
            <Typography
              variant="h1"
              className="Movie-main-info-container-header-title"
              noWrap
            >
              {movie.title}
            </Typography>
            <Typography
              className="Movie-main-info-container-header-vote-badge"
              variant="h2"
              component="span"
              bgcolor={getVoteBadgeColor(movie.vote_average)}
            >
              {movie.vote_average}
            </Typography>
          </Grid>
          {movie.tagline && (
            <Typography
              component="span"
              variant="caption1"
              className="Movie-main-info-container-header-tagline"
            >
              {movie.tagline}
            </Typography>
          )}
          <Grid
            className="Movie-main-info-container-header-favorite-action"
            item
          >
            <FavoriteAction
              isButton={true}
              isFavorite={movie.isFavorite}
              onFavoriteStatusChange={() => onFavoriteStatusChange(movie.id)}
            />
          </Grid>
        </Grid>
        <Grid
          className="Movie-additional-info"
          container
          item
          columns={2}
          spacing={{ xs: 1, md: 2 }}
        >
          <Grid item md>
            <Typography>{movie.overview}</Typography>
          </Grid>
          {!!recommendations?.length && (
            <Grid container item spacing={2} md>
              <Grid
                className="Movie-additional-info-recommendations-title"
                item
                xs
              >
                <Divider>
                  <Typography variant="subtitle1" component="span">
                    Recommendations
                  </Typography>
                </Divider>
              </Grid>
              <Grid container item spacing={2} justifyContent="center">
                {recommendations.map((recommendation) => (
                  <Grid item key={recommendation.id}>
                    <MovieCard
                      movie={recommendation}
                      onFavoriteStatusChange={onFavoriteStatusChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Fragment>
    )
  );
}

export default Movie;
