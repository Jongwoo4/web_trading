import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import {ReactComponent as ReactLogo} from '../../images/logo.svg';

function LoggedOutNavbar() {
  return (
    <Nav>
        <NavLink to='/'>
          <ReactLogo />
        </NavLink>
        {/* <Bars /> */}
        <NavMenu>
            <NavLink to="/allposts" activeStyle>
                All Posts
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
    </Nav>
  )
}

export default LoggedOutNavbar;