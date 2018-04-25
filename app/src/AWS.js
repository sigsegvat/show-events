import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

class AwsApi {

  constructor () {
    AWS.config.region = 'eu-west-1'

    this.loginValid = false
    this.getEvents.bind(this)
    this.auth.bind(this)
  }

  auth (user, pw) {

    return new Promise((resolve, reject) => {

      let authenticationData = {
        Username: user,
        Password: pw,
      }
      let authenticationDetails = new AuthenticationDetails(authenticationData)

      let userPool = new CognitoUserPool({
        UserPoolId: 'eu-west-1_103GpUc8I',
        ClientId: '56e5k087pt0ukianqubsgn0l91'
      })

      let cognitoUser = new CognitoUser({
        Username: user,
        Pool: userPool
      })

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

          let options = {
            IdentityPoolId: 'eu-west-1:7473cecc-2eea-4114-b862-3e086cf87466',
            Logins: {
              'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_103GpUc8I': result.getIdToken().getJwtToken()
            }
          }

          AWS.config.credentials = new AWS.CognitoIdentityCredentials(options)

          AWS.config.credentials.refresh((error) => {
            if (error) {
              console.error(error)
              reject(error)
            } else {
              resolve()
            }
          })

        },

        onFailure: function (error) {
          console.log(error)
          reject(error)
        }

      })
    })

  }

  getEvents (type) {
    let onError = (e) => {
      console.log(e)
    }
    onError = onError.bind(this)
    return new Promise((resolve, reject) => {
      let dynamodb = new AWS.DynamoDB({maxRetries: 1})
      let params = {
        ExpressionAttributeValues: {
          ':v1': {
            S: type
          }
        },
        KeyConditionExpression: 'event_type = :v1',
        ScanIndexForward: false,
        Limit: 10,
        TableName: 'events'
      }
      dynamodb.query(params, function (err, data) {
        if (err) {
          onError()
          reject(err)
        }
        else {
          resolve(data)
        }

      })
    })

  }
}

export default new AwsApi()