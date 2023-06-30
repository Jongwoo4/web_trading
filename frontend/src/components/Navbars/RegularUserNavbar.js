import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
import {ReactComponent as ReactLogo} from '../../images/logo.svg';
function RegularUserNavbar(props) {
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
            <NavLink to="/myposts" activeStyle state={{userID: props.userID}}>
                My Posts
            </NavLink>
            <NavLink to="/mybids" activeStyle>
                My bids
            </NavLink>
            <NavLink to="/messages" activeStyle>
                Messages
            </NavLink>
            <NavLink to="/profile" activeStyle state={{userID: props.userID}}>
                My Profile
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/signin" onClick={() => {props.callback()}}>Sign Out</NavBtnLink>
        </NavBtn>
    </Nav>
  )
}

export default RegularUserNavbar