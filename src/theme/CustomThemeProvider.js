import theme from './theme';
import { ThemeProvider } from '@mui/material';

export default function CustomThemeProvider(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
