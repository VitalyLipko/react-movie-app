import { Box, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_KEY, API_PATH } from '../environments';
import './Movie.css';

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async function fetchMovie() {
      const url = new URL(`${API_PATH}/${params.id}`);
      url.searchParams.append('api_key', API_KEY);

      const res = await fetch(url.toString());
      const payload = await res.json();
      setMovie(payload);
      console.log(payload);
    })();
  }, [params.id]);

  return (
    movie && (
      <Grid container>
        <Grid
          item
          className="Movie-backdrop-container"
          sx={{
            background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) top center`,
          }}
        >
          <Typography
            variant="h1"
            className="Movie-backdrop-container"
            sx={{ color: '#ffffff', fontWeight: 'bold' }}
          >
            {movie.title}
          </Typography>
          <Box></Box>
        </Grid>
        <Grid item>
          <Typography>{movie.overview}</Typography>
        </Grid>
      </Grid>
    )
  );
}

export default Movie;
