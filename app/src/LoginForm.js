import React, { Component } from 'react'
import * as querystring from 'querystring'

class LoginForm extends Component {

 auth_params = {
    client_id: "56e5k087pt0ukianqubsgn0l91",
    redirect_uri: "http://localhost:3000/",
    response_type: "token",
    nonce: Math.random(),
    scope: "openid profile email"
  }
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <a href={"https://sig-segv-at.auth.eu-west-1.amazoncognito.com/login?" +
        querystring.stringify(this.auth_params)}>
          Login</a>
      </div>
    )
  }

}

export default LoginForm