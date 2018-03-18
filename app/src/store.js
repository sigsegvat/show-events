import {observable,action, decorate, toJS} from 'mobx'

export class ApiStore {
    api = {
        url: undefined,
        key: undefined,
        type: "test"
    }

    results = []

    eventTypes = ['ifttt_button','ifttt_entered','test']

    constructor() {

        let api = window.localStorage.getItem("api");
        if (api) {
            this.api = observable(JSON.parse(api))
            this.api.type="test"
        }
        if(this.isInititialized()) {
            this.fetch()
        }

        this.setKey = this.setKey.bind(this)
        this.setUrl = this.setUrl.bind(this)
        this.fetch = this.fetch.bind(this)
        this.isInititialized = this.isInititialized.bind(this)
    }

    setKey(key) {
        this.api.key = key
        window.localStorage.setItem("api",JSON.stringify(toJS(this.api)))
    }

    setUrl(url) {
        this.api.url = url
        window.localStorage.setItem("api",JSON.stringify(toJS(this.api)))
    }

    isInititialized() {
        return this.api.key && this.api.url;
    }

    fetchTypes(type1, type2) {
        let _that = this
        this.fetchType(type1)
            .then(r => {
                _that.results = r.result
            }).then( () => this.fetchType(type2))
            .then(r => {
            _that.results = _that.results.concat(r.result)
        })
    }

    fetch() {
        let _that = this
        if(this.api.type === 'test'){
            this.fetchTypes('ifttt_entered','ifttt_exited')
        } else {
            this.fetchType(this.api.type)
                .then(r => {
                    _that.results = r.result
                })
        }

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
    results: observable,
    setKey: action,
    setUrl: action
})

export default ApiStore
