import { styled, Typography } from '@mui/material';

export const LayoutToolbarAppName = styled(Typography, {
  name: 'Layout-toolbarAppName',
})(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const LayoutNavContainer = styled('ul', { name: 'Layout-navContainer' })(
  {
    display: 'flex',
    listStyleType: 'none',
  },
);
