import { Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_KEY, API_PATH } from '../environments';
import './Movie.css';
import { green, red, grey } from '@mui/material/colors';
import MovieCard from '../MovieCard/MovieCard';

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const background = () =>
    `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) top center`;
  const voteBadgeColor = () => {
    if (movie.vote_average >= 7) {
      return green[500];
    }
    if (movie.vote_average >= 5) {
      return grey[500];
    }
    return red[500];
  };
  const recommendationsList = recommendations.map((recommendation) => (
    <Grid item key={recommendation.id}>
      <MovieCard movie={recommendation} />
    </Grid>
  ));

  useEffect(() => {
    (async function fetchMovie() {
      const movieUrl = new URL(`${API_PATH}/${params.id}`);
      movieUrl.searchParams.append('api_key', API_KEY);
      const recommendationsUrl = new URL(
        `${API_PATH}/${params.id}/recommendations`,
      );
      recommendationsUrl.searchParams.append('api_key', API_KEY);

      const [movieRes, recommendationsRes] = await Promise.all([
        fetch(movieUrl.toString()),
        fetch(recommendationsUrl.toString()),
      ]);
      const [moviePayload, recommendationsPayload] = await Promise.all([
        movieRes.json(),
        recommendationsRes.json(),
      ]);
      setMovie(moviePayload);
      setRecommendations(recommendationsPayload.results);
    })();
  }, [params.id]);

  return (
    movie && (
      <Grid container>
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
              bgcolor={voteBadgeColor()}
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
              {recommendationsList}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}

export default Movie;
