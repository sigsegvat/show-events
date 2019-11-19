import React, { Component } from 'react'
import styled from 'styled-components'
import * as querystring from 'querystring'

const LoginLink = styled.a` 
    color: #FF0095;
    font-size:14px;
    background-color: #73CAD1;
    padding: 20px;
    :hover {
      background-color: #FFF29C;
    }
`

const Login = styled.div` 
  margin: 20% auto;
  text-align: center;
  
`

class LoginForm extends Component {

 auth_params = {
    client_id: "56e5k087pt0ukianqubsgn0l91",
    redirect_uri: /**"http://localhost:3000/",*/"https://d3vsgzl9kzxq91.cloudfront.net/",
    response_type: "token",
    nonce: Math.random(),
    scope: "openid profile email"
  }
  

  render() {
    return (
      <Login>
        <LoginLink href={"https://sig-segv-at.auth.eu-west-1.amazoncognito.com/login?" +
        querystring.stringify(this.auth_params)}>Login</LoginLink>
      </Login>
    )
  }

}

export default LoginForm