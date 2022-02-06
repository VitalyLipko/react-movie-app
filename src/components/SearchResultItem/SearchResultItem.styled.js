import { ListItemButton, styled } from '@mui/material';
import { getVoteBadgeColor } from '../../utils';

export const SearchResultItemInfo = styled(ListItemButton, {
  name: 'SearchResultItem-info',
  shouldForwardProp: (prop) => prop !== 'movie',
})(({ theme, movie }) => ({
  width: '100%',
  '& img': {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: '0.25rem',
  },
  '& .SearchResultItem-info': {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  '& .SearchResultItem-infoPrimary': {
    maxWidth: '100%',
  },
  '& .SearchResultItem-infoSecondary': {
    display: 'flex',
  },
  '& .SearchResultItem-infoSecondaryVoteBadge': {
    flexShrink: 0,
    width: 28,
    borderRadius: '0.125rem',
    background: getVoteBadgeColor(movie.vote_average),
  },
  '& .SearchResultItem-infoSecondaryGenre': {
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
}));
