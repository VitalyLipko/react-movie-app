import { NavLink } from 'react-router-dom';
import { forwardRef, useMemo } from 'react';
import { NavButtonStyled } from './NavButton.styled';
import PropTypes from 'prop-types';

const NavButton = (props) => {
  const { link, children } = props;
  const CustomNavLink = useMemo(
    () =>
      forwardRef((navLinkProps, ref) => (
        <NavLink ref={ref} {...navLinkProps} role={undefined} to={link} />
      )),
    [link],
  );
  return (
    <NavButtonStyled component={CustomNavLink}>{children}</NavButtonStyled>
  );
};

NavButton.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default NavButton;
