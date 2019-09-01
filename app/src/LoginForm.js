import React, { Component } from 'react'
import { Box } from 'gestalt'
import * as querystring from 'querystring'
import AWS from 'aws-sdk'

class LoginForm extends Component {

 google_auth_params = {
    client_id: "587662038991-qg232e5ne00qtpnss1f7sq17bgmee59l.apps.googleusercontent.com",
    redirect_uri: "http://sig.segv.at/timeio/",
    response_type: "token id_token",
    nonce: Math.random(),
    scope: "openid profile email"
  }
  
  constructor(props) {
    super(props)
    AWS.config.region = 'eu-central-1';
    const params = querystring.parse(window.location.hash);
    if (params['id_token']) {
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-central-1:c78ccdae-c5b7-4b32-84b3-dfe28f4bb74f',
        Logins: {
          'accounts.google.com': params['id_token']
        }
      });

      AWS.config.credentials.get(function () {
        if(AWS.config.credentials){
          props.onSuccess()
        }
      });
    }
  }

  render() {
    return (
      <Box>
        <a href={"https://accounts.google.com/o/oauth2/v2/auth?" +
        querystring.stringify(this.google_auth_params)}>
          Login with Google</a>
      </Box>
    )
  }

}

export default LoginForm