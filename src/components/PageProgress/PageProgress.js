import { CircularProgress, Grid } from '@mui/material';

import { PageProgressContainer } from './PageProgress.styled';

export default function PageProgress() {
  return (
    <PageProgressContainer container item>
      <Grid item>
        <CircularProgress />
      </Grid>
    </PageProgressContainer>
  );
}
