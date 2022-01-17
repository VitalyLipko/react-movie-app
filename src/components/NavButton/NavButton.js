import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavButton.css';
import { forwardRef, useMemo } from 'react';

export default function NavButton(props) {
  const { link, label } = props;
  const CustomNavLink = useMemo(
    () =>
      forwardRef((navLinkProps, ref) => (
        <NavLink ref={ref} {...navLinkProps} role={undefined} to={link} />
      )),
    [link],
  );
  return (
    <Button className="NavButton" component={CustomNavLink}>
      {label}
    </Button>
  );
}
