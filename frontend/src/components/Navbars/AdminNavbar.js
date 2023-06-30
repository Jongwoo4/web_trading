import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import {ReactComponent as ReactLogo} from '../../images/logo.svg';

function AdminNavbar(props){
  return (
    <Nav>
        <NavLink to='/'>
          <ReactLogo />
        </NavLink>
        {/* <Bars /> */}
        <NavMenu>
            <NavLink to="/reports" activeStyle>
                Reports
            </NavLink>
            <NavLink to="/allposts" activeStyle>
                All Posts
            </NavLink>
            <NavLink to="/messages" activeStyle>
                Messages
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                Dashboard
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/signin" onClick={() => {props.callback()}}>Sign Out</NavBtnLink>
        </NavBtn>
    </Nav>
  )
}

export default AdminNavbar