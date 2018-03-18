import {observable, decorate, toJS, autorun} from 'mobx'

export class ApiStore {
    api = {
        url: undefined,
        key: undefined,
        types: {
            ifttt_button: false,
            ifttt_entered: false,
            test: true
        }
    }

    results = []

    constructor() {

        let localStorage = window.localStorage.getItem("api");
        if (localStorage) {
            let parse = JSON.parse(localStorage);
            this.api.url = parse.url
            this.api.key = parse.key
        }

        let api = this.api
        autorun(() => {
            window.localStorage.setItem("api", JSON.stringify(toJS(api)))
        })

        let results = this.results
        autorun(() => {

            results.clear()
            Object.keys(api.types).forEach(e => {
                if (api.types[e] && this.isInititialized()) {
                    this.fetchType(e).then(r => {
                        r.result.forEach(e => results.push(e))
                    })
                }
            })
        })


        this.isInititialized = this.isInititialized.bind(this)
    }


    isInititialized() {
        return this.api.key && this.api.url;
    }


    fetchType(type) {
        return fetch(this.api.url + type,
            {
                headers: {
                    'x-api-key': this.api.key
                }
            })
            .then(r => r.json());
    }
}

decorate(ApiStore, {
    api: observable,
    type: observable,
    results: observable
})


export default ApiStore
