import React from 'react';
import { Box, Grid } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
import { API_KEY, API_PATH } from '../environments';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardList: [] };
  }

  async componentDidMount() {
    const url = new URL(`${API_PATH}/popular`);
    url.searchParams.append('api_key', API_KEY);

    const res = await fetch(url.toString());
    const payload = await res.json();

    this.setState({ cardList: this.createCardList(payload.results) });
  }

  createCardList(movies) {
    return movies.map((movie) => (
      <Grid item key={movie.id.toString()}>
        <MovieCard movie={movie} />
      </Grid>
    ));
  }

  render() {
    return (
      <Box sx={{ padding: '16px 0 0 16px' }}>
        <Grid container spacing={2}>
          {this.state.cardList}
        </Grid>
      </Box>
    );
  }
}

export default Popular;
