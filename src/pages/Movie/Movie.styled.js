import { Grid, styled } from '@mui/material';

export const MovieAdditionalInfo = styled(Grid, {
  name: 'Movie-additionalInfo',
})(({ theme }) => ({
  padding: theme.spacing(2, 0, 0, 2),
  '& .Movie-additionalInfo-recommendationsTitle': {
    paddingRight: theme.spacing(2),
  },
}));
