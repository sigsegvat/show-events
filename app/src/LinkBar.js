import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

let StyledLink = styled(NavLink)` 
  color: #FF0095;
  font-size:14px;
  background-color: #73CAD1;
  padding: 5px;
  :hover {
    background-color: #FFF29C;
  }
  &.active {
    background-color: #FFF29C;
  }
`
let NavItem = styled.li` 
  list-style: none;
  display: inline;
`

let NavList = styled.ul` 
  list-style-type: none;
`

let LinkBar = (props) => <React.Fragment> {props.loggedIn &&
  <nav>
    <NavList>
      <NavItem><StyledLink to="/door_tag">door tag</StyledLink></NavItem>
      <NavItem><StyledLink to="/work">work log</StyledLink></NavItem>
    </NavList>
  </nav>
}</React.Fragment>

export default styled(LinkBar)` 

  `