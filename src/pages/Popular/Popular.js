import React from 'react';
import { Grid } from '@mui/material';
import { FAVORITES_STORAGE_KEY } from '../../environments';
import { MovieCard } from '../../components';
import { getPopular } from '../../adapters';

class Popular extends React.Component {
  controller = new AbortController();

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      favorites: JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
    };
  }

  async componentDidMount() {
    try {
      const res = await getPopular(this.controller.signal);

      this.setState((state) => ({
        movies: res.results.map((movie) => ({
          ...movie,
          isFavorite: state.favorites.includes(movie.id),
        })),
      }));
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  }

  componentDidUpdate(_, prevState, __) {
    if (!prevState.movies) {
      return;
    }
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(
        this.state.movies
          .filter(({ isFavorite }) => isFavorite)
          .map(({ id }) => id),
      ),
    );
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  onFavoriteStatusChange(id) {
    this.setState((state) => ({
      movies: state.movies.map((movie) => ({
        ...movie,
        isFavorite: movie.id === id ? !movie.isFavorite : movie.isFavorite,
      })),
    }));
  }

  render() {
    return (
      <Grid container spacing={2} item p="16px 0 0 16px">
        {this.state.movies &&
          this.state.movies.map((movie) => (
            <Grid item key={movie.id.toString()}>
              <MovieCard
                movie={movie}
                onFavoriteStatusChange={this.onFavoriteStatusChange.bind(this)}
              />
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default Popular;
