import React, { Component } from 'react'
import 'gestalt/dist/gestalt.css'
import { Box } from 'gestalt'
import ShowItems from './ShowItems'
import LoginForm from './LoginForm'

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      initialized: false,
      activeTabIndex: 0
    }
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
           <ShowItems/>
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


