import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getVoteBadgeColor } from '../../utils';
import { FavoriteAction } from '../index';
import { changeStatus, selectFavoriteIds } from '../../store';
import { useEffect, useState } from 'react';
import {
  MovieMainInfoBackdropContainer,
  MovieMainInfoContainer,
} from './MovieMainInfo.styled';

export default function MovieMainInfo(props) {
  const { movie } = props;
  const favoriteIds = useSelector(selectFavoriteIds);
  const [isFavorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const onFavoriteStatusChange = () => dispatch(changeStatus(movie.id));

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
            isButton={true}
            isFavorite={isFavorite}
            onFavoriteStatusChange={onFavoriteStatusChange}
          />
        </Grid>
      </MovieMainInfoContainer>
    </>
  );
}
