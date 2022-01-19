import { Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Movie.css';
import { MovieList, MovieMainInfo } from '../../components';
import { getMovie, getRecommendations } from '../../adapters';

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchData() {
      try {
        const [movieRes, recommendationsRes] = await Promise.all([
          getMovie(params.id, controller.signal),
          getRecommendations(params.id, controller.signal),
        ]);
        setRecommendations(recommendationsRes.results);
        setMovie(movieRes);
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    })();

    return () => controller.abort();
  }, [params.id]);

  return (
    movie && (
      <>
        <MovieMainInfo movie={movie} />
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
              <MovieList movies={recommendations} />
            </Grid>
          )}
        </Grid>
      </>
    )
  );
}

export default Movie;
