import React, { Component } from 'react'
import { Box, Button, Text, TextField, Label } from 'gestalt'
import AwsApi from './AWS'

class LoginForm extends Component {

  constructor (props) {
    super(props)
    this.state = {user: '', pw: ''}

    this.onSubmit = this.onSubmit.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.onPwChange = this.onPwChange.bind(this)
  }

  onUserChange (e) {
    this.setState({user: e.value})
  }

  onPwChange (e) {
    this.setState({pw: e.value})
  }

  onSubmit (e) {
    e.preventDefault()
    let _form = this
    _form.setState({error: false})
    AwsApi.auth(this.state.user, this.state.pw)
      .then(() => {
        _form.setState({error: false})
        _form.props.onSuccess()
      })
      .catch(() => {
        _form.setState({error: true})
        setTimeout(() => _form.setState({error: false}), 2000)
      })
  }

  render () {
    return (
      <Box>
        <form action="#" onSubmit={this.onSubmit}>
          <Label htmlFor="user"><Text>User</Text></Label>
          <TextField id="user" type="text" value={this.state.user} onChange={this.onUserChange}/>
          <Label htmlFor="pw"><Text>Password</Text></Label>
          <TextField id="pw" type="password" value={this.state.pw} onChange={this.onPwChange}/>
          <Box padding={1}>
            {this.state.error && <Box color="red" shape="rounded" padding={1}>
              <Text color="white" bold={true}>Invalid Credentials</Text></Box>}

          </Box>
          <Box paddingY={2}><Button type="submit" text="Save"/></Box>
        </form>
      </Box>
    )
  }

}

export default LoginForm