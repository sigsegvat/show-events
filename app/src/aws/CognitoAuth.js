import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

class CognitoAuth {

  constructor () {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'eu-west-1_103GpUc8I',
      ClientId: '56e5k087pt0ukianqubsgn0l91'
    })

    this.local.bind(this)
    this.auth.bind(this)
  }

  local() {
    let cognitoUser = this.userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
      if (cognitoUser !== null) {
        cognitoUser.getSession((err, session) => {
          CognitoAuth.setCredentials(session.getIdToken().getJwtToken()).then(resolve, reject)
        })
      } else {
        reject('no user found')
      }
    })
  }

  auth(user, pw) {

    let cognitoUser = new CognitoUser({
      Username: user,
      Pool: this.userPool
    })
    let authenticationDetails = new AuthenticationDetails({
      Username: user,
      Password: pw,
    })

    return new Promise((resolve, reject) => {

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            CognitoAuth.setCredentials(result.getIdToken().getJwtToken()).then(resolve, reject)
          },

          onFailure: function (error) {
            console.log(error)
            reject(error)
          }

        })
      }
    )

  }

  static setCredentials (jwtToken) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-1:7473cecc-2eea-4114-b862-3e086cf87466',
      Logins: {
        'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_103GpUc8I': jwtToken
      }
    })
    return new Promise((resolve, reject) => {
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          resolve()
        }
      })

    })
  }

}

export default new CognitoAuth()