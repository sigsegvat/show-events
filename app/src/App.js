import React, { Component } from 'react'
import 'gestalt/dist/gestalt.css'
import { Box, Spinner, Text } from 'gestalt'
import ShowItems from './ShowItems'
import InitForm from './InitForm'

const {Provider, Consumer} = React.createContext()
export { Consumer }

export default class App extends Component {

  constructor () {
    super()

    let api = {}

    let results = []

    let localStorage = window.localStorage.getItem('api')
    if (localStorage) {
      let parse = JSON.parse(localStorage)
      api.url = parse.url
      api.key = parse.key
    }

    this.fetchResult = this.fetchResult.bind(this)
    this.fetchType = this.fetchType.bind(this)

    let setApi = (api) => {
      this.setState({api: api})
      window.localStorage.setItem('api', JSON.stringify(api))
    }

    this.state = {
      results: results,
      api: api,
      error: false,
      initialized: true,
      setApi: setApi,
      fetchResult: this.fetchResult
    }

    this.fetchResult()

  }

  fetchResult () {
    return this.fetchType('ifttt_entered').then(r => {
      let results = this.state.results.concat(r.result).sort((a, b) => a.event_time - b.event_time)
      this.setState({results: results})
    }).then(() => {
      return this.fetchType('ifttt_exited').then(r => {
        let results = this.state.results.concat(r.result).sort((a, b) => a.event_time - b.event_time)
        this.setState({results: results})
      })
    }).then(() => {
      this.setState({initialized: true})
    }).catch(() => this.setState({initialized: false}))

  }

  fetchType (type) {
    return fetch(this.state.api.url + type,
      {
        headers: {
          'x-api-key': this.state.api.key
        }
      })
      .then(r => r.json())
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
          <Box display={this.state.initialized ? 'none' : 'block'}>
            <InitForm/>
          </Box>
          }
        </Box>
      </Provider>

    )
  }
}

let Loading = (props) => <Box display={props.show ? 'flex' : 'none'} alignItems="center" justifyContent="center">
  <Box padding={2}><Text size="lg">Loading</Text></Box>
  <Spinner show={true}/>
</Box>
