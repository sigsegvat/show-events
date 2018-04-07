import React, {Component} from "react";


const {Provider, Consumer} = React.createContext();

export class ApiStore extends Component {

    constructor() {
        super()

        let api = {
            url: undefined,
            key: undefined,
            types: {
                ifttt_button: false,
                ifttt_entered: false,
                test: true
            }
        }

        let results = []

        let localStorage = window.localStorage.getItem("api");
        if (localStorage) {
            let parse = JSON.parse(localStorage);
            api.url = parse.url
            api.key = parse.key
        }

        this.isInititialized = this.isInititialized.bind(this)
        this.toggleType = this.toggleType.bind(this)

        this.state = {
            results: results,
            api: api,
            isInititialized: this.isInititialized,
            toggleType: this.toggleType
        }

    }

    toggleType(name) {
        if (this.state.api.types[name]) {
            this.setState({results: this.state.results.filter(r => r.event_type !== name)})
        } else {
            this.fetchType(name).then(r => {
                this.setState({results: r.result.concat(this.state.results)})
            })
        }
        this.setState((prev) => {
            let api = prev.api
            api.types[name] = !api.types[name]
            return {api: api}
        })

    }

    isInititialized() {
        return this.state.api.key && this.state.api.url;
    }


    fetchType(type) {
        return fetch(this.state.api.url + type,
            {
                headers: {
                    'x-api-key': this.state.api.key
                }
            })
            .then(r => r.json());
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>

        )
    }
}

export default {Consumer, ApiStore};
