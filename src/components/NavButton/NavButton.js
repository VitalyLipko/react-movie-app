import { NavLink } from 'react-router-dom';
import { forwardRef, useMemo } from 'react';
import { NavButtonStyled } from './NavButton.styled';

export default function NavButton(props) {
  const { link, label } = props;
  const CustomNavLink = useMemo(
    () =>
      forwardRef((navLinkProps, ref) => (
        <NavLink ref={ref} {...navLinkProps} role={undefined} to={link} />
      )),
    [link],
  );
  return <NavButtonStyled component={CustomNavLink}>{label}</NavButtonStyled>;
}
