import React, { Component } from 'react'
import 'gestalt/dist/gestalt.css'
import { Box, Spinner, Text } from 'gestalt'
import ShowItems from './ShowItems'
import LoginForm from './LoginForm'
import AwsApi from './AWS'

const {Provider, Consumer} = React.createContext()
export { Consumer }

export default class App extends Component {

  constructor () {
    super()

    this.state = {
      results: [],
      initialized: false,
    }

    this.fetchResults = this.fetchResults.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)

    if (this.state.initialized) {
      this.fetchResults()
    }

  }

  onLoginSuccess() {
    this.setState({initialized: true})
    this.fetchResults()
  }

  fetchResults () {

    let onFulfilled = (r) => {
      return r.Items.map((i) => {
        return {event_time: parseInt(i.event_time.N), event_type: i.event_type.S}
      })
    }

    let _app = this
    let onRejected = (r) => {

    }

    let r1 = AwsApi.getEvents('ifttt_exited').then(onFulfilled, onRejected)
    let r2 = AwsApi.getEvents('ifttt_entered').then(onFulfilled, onRejected)

    Promise.all([r1, r2]).then(([entered, exited]) => {
      _app.setState({
        results: entered.concat(exited).sort((a,b)=>a.event_time-b.event_time)
      })
    })

  }

  render () {
    return (
      <Provider value={this.state}>
        <Box padding={3} minWidth={200}>
          {this.state.initialized &&
          <Box>
            <ShowItems/>
            <Loading show={this.state.results.length === 0}/>
          </Box>
          }
          {!this.state.initialized &&
          <Box display="block">
            <LoginForm onSuccess={this.onLoginSuccess}/>
          </Box>
          }

        </Box>
      </Provider>

    )
  }
}

let Loading = (props) => <Box display={props.show ? 'flex' : 'none'} alignItems="center" justifyContent="center">
  <Box padding={2}><Text size="lg">Loading</Text></Box>
  <Spinner show={true} accessibilityLabel="spinner"/>
</Box>
