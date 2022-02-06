import { OutlinedInput, Popper, styled } from '@mui/material';

export const SearchInput = styled(OutlinedInput, { name: 'Search-input' })({
  marginLeft: 'auto',
  '&:hover, :active': {
    background: 'rgba(255, 255, 255, 0.25)',
  },
});

export const SearchPopper = styled(Popper, { name: 'Search-popper' })(
  ({ theme }) => ({
    zIndex: theme.zIndex.drawer,
    '& .Search-popperResults': {
      marginTop: theme.spacing(0.5),
      maxHeight: 380,
      width: 318,
      overflow: 'hidden auto',
    },
  }),
);
