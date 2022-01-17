import { CircularProgress, Grid } from '@mui/material';

import './PageProgress.css';

export default function PageProgress() {
  return (
    <Grid
      className="PageProgress"
      container
      justifyContent="center"
      alignItems="center"
      item
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
