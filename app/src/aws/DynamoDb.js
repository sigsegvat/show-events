import AWS from 'aws-sdk'

export class DynamoDbApi {

  getEvents (type) {

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
          console.log(err)
          reject(err)
        }
        else {
          resolve(data)
        }

      })
    })

  }

}


export default new DynamoDbApi()