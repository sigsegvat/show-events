import React from 'react'
import {Link  } from "react-router-dom";

let LinkBar =  (props) =>  <React.Fragment> {props.loggedIn &&
    <nav>
      <ul>
        <li><Link to="/door_tag">door tag</Link>
        </li>
        <li> <Link to="/work">work log</Link>
        </li>
      </ul>
    </nav>
  }</React.Fragment>

  export default LinkBar