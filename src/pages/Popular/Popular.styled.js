import { Grid, styled } from '@mui/material';

export const PopularPaginationContainer = styled(Grid, {
  name: 'Popular-paginationContainer',
})(({ theme }) => ({ padding: theme.spacing(2, 0) }));
