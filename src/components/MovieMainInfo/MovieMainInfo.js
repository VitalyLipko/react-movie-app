import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getVoteBadgeColor } from '../../utils';
import { FavoriteAction } from '../index';
import { changeStatus, selectFavoriteIds } from '../../store';
import { useCallback, useEffect, useState } from 'react';
import {
  MovieMainInfoBackdropContainer,
  MovieMainInfoContainer,
} from './MovieMainInfo.styled';

const MovieMainInfo = (props) => {
  const { movie } = props;
  const favoriteIds = useSelector(selectFavoriteIds);
  const [isFavorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const onFavoriteStatusChange = useCallback(
    () => dispatch(changeStatus(movie.id)),
    [dispatch, movie.id],
  );

  useEffect(() => {
    setFavorite(favoriteIds.includes(movie.id));
  }, [favoriteIds, movie.id]);

  return (
    <>
      <MovieMainInfoBackdropContainer item movie={movie} />
      <MovieMainInfoContainer container item wrap="nowrap">
        <Grid container item alignItems="center" wrap="nowrap">
          <Typography variant="h1" className="MovieMainInfo-headerTitle" noWrap>
            {movie.title}
          </Typography>
          <Typography
            className="MovieMainInfo-voteBadge"
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
            className="MovieMainInfo-tagline"
          >
            {movie.tagline}
          </Typography>
        )}
        <Grid className="MovieMainInfo-favoriteAction" item>
          <FavoriteAction
            isButton
            isFavorite={isFavorite}
            onClick={onFavoriteStatusChange}
          />
        </Grid>
      </MovieMainInfoContainer>
    </>
  );
};

MovieMainInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieMainInfo;
