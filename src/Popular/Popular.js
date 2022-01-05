import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
import { API_KEY, API_PATH, FAVORITES_STORAGE_KEY } from '../environments';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      favorites: JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
    };
  }

  async componentDidMount() {
    const url = new URL(`${API_PATH}/popular`);
    url.searchParams.append('api_key', API_KEY);

    const res = await fetch(url.toString());
    const payload = await res.json();

    this.setState((state) => ({
      movies: payload.results.map((movie) => ({
        ...movie,
        isFavorite: state.favorites.includes(movie.id),
      })),
    }));
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
