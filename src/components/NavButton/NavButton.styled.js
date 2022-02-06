import { Button, styled } from '@mui/material';

export const NavButtonStyled = styled(Button, { name: 'NavButton' })(
  ({ theme }) => ({
    color: theme.palette.common.white,
    '&.active': {
      background: theme.palette.secondary.light,
    },
    '&:hover:not(.active)': {
      background: theme.palette.secondary.main,
    },
    '&.active:hover': {
      background: theme.palette.secondary.dark,
    },
  }),
);
