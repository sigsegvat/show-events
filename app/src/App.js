import React, { Component } from 'react'
import ShowItems from './ShowItems'
import LoginForm from './LoginForm'
import LinkBar from './LinkBar'
import ShowWorkItems from './ShowWorkTimes'
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";


import SecurityContext from './SecurityContext'

class App extends Component {

  constructor(props) {
    super(props);

   if (sessionStorage.getItem("accessToken")) {
      this.state = {
        loggedIn: true,
        accessToken: sessionStorage.getItem("accessToken")
      }
    }
    else {
      this.state = {
        loggedIn: false
      }
      this.props.history.push("/login")
    }

  }

  onLoggedIn= (accessToken) =>{
    console.log(accessToken)
    this.setState({
      loggedIn: true,
      accessToken: accessToken
    })
    sessionStorage.setItem("accessToken", this.state.accessToken)
    this.props.history.push("/work")
  }

  render() {

    return (
      <div>

        <LinkBar loggedIn={this.state.loggedIn} />
        <div>
          <SecurityContext.Provider value={this.state.accessToken}>
            <Switch>
              <Route path="/login">
                <LoginForm onLoggedIn={this.onLoggedIn} />
              </Route>
              <Route path="/door_tag">
                <ShowItems title="ruuvi tag" eventType="door_tag" key="door" />
              </Route>
              <Route path="/work">
                <ShowWorkItems />
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
