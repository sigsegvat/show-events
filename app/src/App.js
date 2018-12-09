import React, { Component } from 'react'
import 'gestalt/dist/gestalt.css'
import { Box, Spinner, Text, Tabs } from 'gestalt'
import ShowItems from './ShowItems'
import LoginForm from './LoginForm'
import CognitoAuth from './aws/CognitoAuth'
import ShowSensor from './ShowSensor'

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      initialized: false,
      activeTabIndex: 0
    }
    CognitoAuth.local().then(this.onLoginSuccess)
  }

  onLoginSuccess = () => this.setState({initialized: true})

  tabChange = (e) => {
    this.setState({activeTabIndex: e.activeTabIndex})
  }

  render () {
    return (

      <Box padding={3} minWidth={200}>
        {this.state.initialized &&
        <Box>
          <Tabs
            tabs={[{text: 'Work'}, {text: 'Sensor1'}]}
            activeTabIndex={this.state.activeTabIndex}
            onChange={this.tabChange}
          />
          {this.state.activeTabIndex === 0 && <ShowItems/>}
          {this.state.activeTabIndex === 1 && <ShowSensor/>}
        </Box>
        }
        {!this.state.initialized &&
        <Box display="block">
          <LoginForm onSuccess={this.onLoginSuccess}/>
        </Box>
        }

      </Box>


    )
  }
}


