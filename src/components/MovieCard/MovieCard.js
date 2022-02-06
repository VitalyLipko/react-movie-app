import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoriteAction } from '../index';
import { memo } from 'react';
import isEqual from 'lodash/isEqual';
import { MovieCardContent } from './MovieCard.styled';

function MovieCard(props) {
  const { movie, onFavoriteStatusChange } = props;
  const ASPECT_RATIO = 4 / 3;
  const size = 243;
  const cssProps = { height: Math.round(ASPECT_RATIO * size), width: size };

  return (
    <Card sx={cssProps}>
      <CardActionArea LinkComponent={Link} to={`/movies/${movie.id}`}>
        <CardMedia
          component="img"
          height="204"
          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.original_title}
        />
        <MovieCardContent>
          <Tooltip title={movie.title}>
            <Typography component="span" variant="h6" noWrap>
              {movie.title}
            </Typography>
          </Tooltip>
        </MovieCardContent>
      </CardActionArea>
      <CardActions>
        <FavoriteAction
          isFavorite={movie.isFavorite}
          onFavoriteStatusChange={() => onFavoriteStatusChange(movie.id)}
        />
      </CardActions>
    </Card>
  );
}

const MovieCardMemo = memo(MovieCard, (pr, cr) => isEqual(pr.movie, cr.movie));

export default MovieCardMemo;
