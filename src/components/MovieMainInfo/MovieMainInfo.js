import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getVoteBadgeColor } from '../../utils';
import { FavoriteAction } from '../index';
import { changeStatus, selectFavoriteIds } from '../../store';
import { useEffect, useState } from 'react';
import './MovieMainInfo.css';

export default function MovieMainInfo(props) {
  const { movie } = props;
  const favoriteIds = useSelector(selectFavoriteIds);
  const [isFavorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const onFavoriteStatusChange = () => dispatch(changeStatus(movie.id));
  const background = movie.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) top center`
    : undefined;

  useEffect(() => {
    setFavorite(favoriteIds.includes(movie.id));
  }, [favoriteIds, movie.id]);

  return (
    <>
      <Grid item className="Movie-backdrop-container" sx={{ background }} />
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
        <Grid className="Movie-main-info-container-header-favorite-action" item>
          <FavoriteAction
            isButton={true}
            isFavorite={isFavorite}
            onFavoriteStatusChange={onFavoriteStatusChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
