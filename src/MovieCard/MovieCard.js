import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
  const ASPECT_RATIO = 4 / 3;
  const size = 200;
  const cssProps = { height: Math.round(ASPECT_RATIO * size), width: size };
  return (
    <Card sx={cssProps}>
      <CardActionArea LinkComponent={Link} to={`movies/${props.movie.id}`}>
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
    </Card>
  );
}

export default MovieCard;
