import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { FavoriteAction } from '../index';

function MovieCard(props) {
  const ASPECT_RATIO = 4 / 3;
  const size = 243;
  const cssProps = { height: Math.round(ASPECT_RATIO * size), width: size };

  const onFavoriteStatusChange = () =>
    props.onFavoriteStatusChange(props.movie.id);

  return (
    <Card sx={cssProps}>
      <CardActionArea LinkComponent={Link} to={`/movies/${props.movie.id}`}>
        <CardMedia
          component="img"
          height="204"
          image={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          alt={props.movie.original_title}
        />
        <CardContent className="MovieCard-content">
          <Tooltip title={props.movie.title}>
            <Typography component="span" variant="h6" noWrap>
              {props.movie.title}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FavoriteAction
          isFavorite={props.movie.isFavorite}
          onFavoriteStatusChange={onFavoriteStatusChange}
        />
      </CardActions>
    </Card>
  );
}

export default MovieCard;
