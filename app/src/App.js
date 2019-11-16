import React, { Component } from 'react'
import ShowItems from './ShowItems'
import LoginForm from './LoginForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect, withRouter
} from "react-router-dom";
import * as querystring from 'querystring'

import SecurityContext from './SecurityContext'

class App extends Component {

  constructor(props) {
    super(props);
    var hash = querystring.parse(this.props.location.hash);
    
    if (hash['#id_token']) {
      this.state = {
        loggedIn: true,
        accessToken: hash['#id_token']
      }
      this.props.history.push("/")
    } else {
      this.state = {
        loggedIn: false
      }
      this.props.history.push("/login")
    }
    

  }

  render() {
   
    return (
      <div>
       
        {this.state.loggedIn &&
          <nav>
            <ul>
              <li><Link to="/door_tag">door tag</Link>
              </li>
              <li> <Link to="/work">work log</Link>
              </li>
            </ul>
          </nav>
        }
        <div>
        <SecurityContext.Provider value={this.state.accessToken}>
          <Switch>
            <Route path="/login">
              <LoginForm onLoggedIn={this.onLoggedIn} />
            </Route>
            <Route path="/door_tag">
              <ShowItems eventType="door_tag" />
            </Route>
            <Route path="/work">
              <ShowItems eventType="ifttt_entered" />
              <ShowItems eventType="ifttt_exited" />
            </Route>

          </Switch>
          </SecurityContext.Provider>
        </div>
      </div>


    )
  }
}

var AppWithRouter = withRouter(App);

export default ((props) => <Router><AppWithRouter /></Router>)
