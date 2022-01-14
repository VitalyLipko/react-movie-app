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
        <CardContent className="MovieCard-content">
          <Tooltip title={movie.title}>
            <Typography component="span" variant="h6" noWrap>
              {movie.title}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FavoriteAction
          test={movie.original_title}
          isFavorite={movie.isFavorite}
          onFavoriteStatusChange={() => onFavoriteStatusChange(movie.id)}
        />
      </CardActions>
    </Card>
  );
}

export default MovieCard;
