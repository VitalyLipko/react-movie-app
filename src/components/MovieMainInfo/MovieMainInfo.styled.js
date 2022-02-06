import { Grid, styled } from '@mui/material';

export const MovieMainInfoBackdropContainer = styled(Grid, {
  name: 'MovieMainInfo-backdropContainer',
  shouldForwardProp: (prop) => prop !== 'movie',
})(({ theme, movie }) => ({
  height: theme.backgroundMovieHeight,
  width: '100%',
  background:
    movie.backdrop_path &&
    `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) top center`,
}));

export const MovieMainInfoContainer = styled(Grid, {
  name: 'MovieMainInfo-container',
})(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(1.5, 3, 0, 3),
  height: theme.backgroundMovieHeight,
  flexDirection: 'column',
  background: 'rgba(0, 0, 0, 0.44)',
  '& .MovieMainInfo-headerTitle': {
    marginRight: theme.spacing(2),
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
  '& .MovieMainInfo-voteBadge': {
    width: 100,
    flexShrink: 0,
    textAlign: 'center',
    borderRadius: '0.25rem',
  },
  '& .MovieMainInfo-tagline': {
    color: theme.palette.common.white,
    fontStyle: 'italic',
  },
  '& .MovieMainInfo-favoriteAction': {
    margin: theme.spacing('auto', 0, 3, 'auto'),
  },
}));
