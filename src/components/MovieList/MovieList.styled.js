import { Grid, styled } from '@mui/material';

export const MovieListContainer = styled(Grid, {
  name: 'MovieList-container',
  shouldForwardProp: (prop) => prop !== 'extraPaddings',
})(({ extraPaddings, theme }) => ({
  justifyContent: 'center',
  padding: extraPaddings && theme.spacing(2, 0, 2),
}));
