import { Button } from '@mui/material';
import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import './NavButton.css';

export default function NavButton(props) {
  const resolvedPath = useResolvedPath(props.link);
  const match = !!useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Button
      className={'NavButton' + (match ? ' NavButton-active' : '')}
      component={Link}
      to={props.link}
    >
      {props.label}
    </Button>
  );
}
