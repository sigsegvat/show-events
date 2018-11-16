import AWS from 'aws-sdk'

class CognitoAuth {

    constructor() {
        this.local.bind(this)
        this.auth.bind(this)
    }

    static getFromStorage() {
        let accessKeyId = window.localStorage.getItem('accessKeyId');
        let secretAccessKey = window.localStorage.getItem('secretAccessKey');
        if (accessKeyId && secretAccessKey) {
            return {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey
            }

        }
    }

    static saveToStorage(keys){
        window.localStorage.setItem('accessKeyId', keys.accessKeyId)
        window.localStorage.setItem('secretAccessKey', keys.secretAccessKey)
    }

    local() {

        return new Promise((resolve, reject) => {

            let keys = CognitoAuth.getFromStorage()
            if (keys) {
                AWS.config.credentials = new AWS.Credentials(keys)
                resolve()
            }
            else {
                reject();
            }

        })
    }

    auth(user, pw) {

        let keys = {
            accessKeyId: user,
            secretAccessKey: pw
        };
        AWS.config.credentials = new AWS.Credentials(keys)

        return AWS.config.credentials.getPromise().then(CognitoAuth.saveToStorage(keys));


    }



}

export default new CognitoAuth()