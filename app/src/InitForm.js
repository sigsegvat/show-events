import React, { Component } from 'react'
import { Box, Button, Text, TextField, Label } from 'gestalt'
import { Consumer } from './App'

class InitForm extends Component {

  constructor (props) {
    super(props)
    this.onUrlChange = this.onUrlChange.bind(this)
    this.onKeyChange = this.onKeyChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onUrlChange (e) {
    this.props.setApi({url: e.value, key: this.props.api.key})
  }

  onKeyChange (e) {
    this.props.setApi({key: e.value, url: this.props.api.url})
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  render () {
    return (
      <Box>
        <form action="#" onSubmit={this.onSubmit}>
          <Label htmlFor="url"><Text>API URL</Text></Label>
          <TextField id="url" type="url" value={this.props.api.url} onChange={this.onUrlChange}/>
          <Label htmlFor="key"><Text>API key</Text></Label>
          <TextField id="key" type="password" value={this.props.api.key} onChange={this.onKeyChange}/>
          {this.props.error && <Box padding={1}><Text color="red">Invalid Configuration</Text></Box>}
          <Button type="submit" text="Save"/>
        </form>
      </Box>
    )
  }

}

export default () => <Consumer>{(props) => {
  return <InitForm api={props.api} error={props.error} setApi={props.setApi} onSubmit={props.fetchResult}/>
}}</Consumer>