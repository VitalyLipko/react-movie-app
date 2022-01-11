import { green, grey, red } from '@mui/material/colors';

export default function getVoteBadgeColor(vote) {
  if (vote >= 7) {
    return green[500];
  }
  if (vote >= 5) {
    return grey[500];
  }
  return red[500];
}
