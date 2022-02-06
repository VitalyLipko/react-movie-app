import { Box, styled } from '@mui/material';

export const SearchResultsEmpty = styled(Box, { name: 'SearchResults-empty' })(
  ({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
  }),
);
export const SearchResultsInProgress = styled(Box, {
  name: 'SearchResults-inProgress',
})(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));
