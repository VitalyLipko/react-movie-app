import MovieCard from './movie-card/movie-card';
import { Box, Grid } from '@mui/material';
import React from 'react';

const API_KEY = 'bebd61ac069805fc5f54de2f0e6b838e';
class App extends React.Component {
  cardList = [];

  render() {
    return (
      <Box sx={{ padding: '16px 0 0 16px' }}>
        <Grid container spacing={2}>
          {this.cardList}
        </Grid>
      </Box>
    );
  }

  async componentDidMount() {
    const url = new URL('https://api.themoviedb.org/3/movie/popular');
    url.searchParams.append('api_key', API_KEY);

    const res = await fetch(url.toString());
    const payload = await res.json();
    this.cardList = this.createCardList(payload.results);

    this.setState({ cardList: this.cardList });
  }

  createCardList(movies) {
    return movies.map((movie) => (
      <Grid item key={movie.id}>
        <MovieCard movie={movie} />
      </Grid>
    ));
  }
}

export default App;
