import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

let StyledLink = styled(NavLink)` 
  color: #FF0095;
  width: 100%;
  display:block;
  font-size:14px;
  background-color: #FFF29C;
  padding: 5px;
  :hover {
    color: #FFF29C;
    background-color: #FF0095;
  }
  &.active, &.active:hover {
    color: #FF0095;
    background-color: #73CAD1;
  }
`


let NavItem = styled.li` 
  list-style: none;
  display: block;
`

let LogoutItem = styled(NavItem)`
   grid-area: logout;
`

let NavList = styled.ul` 
  background-color: #FFF29C;
  list-style-type: none;
  margin:10 0;
  padding:0;
  display: grid;
  grid-template-columns: repeat(5,90px) auto 90px;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  grid-template-areas: "link link link link link . logout";
`

let LinkBar = (props) => <React.Fragment> {props.loggedIn &&
  <nav>
    <NavList>
      <NavItem><StyledLink to="/door_tag">door tag</StyledLink></NavItem>
      <NavItem><StyledLink to="/work">work log</StyledLink></NavItem>
      <LogoutItem><StyledLink to="/logout" onClick={() => {sessionStorage.clear(); window.location='/'}}>logout</StyledLink></LogoutItem>
    </NavList>
  </nav>
}</React.Fragment>

export default styled(LinkBar)` 

  `