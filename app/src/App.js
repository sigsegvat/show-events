import React, {Component} from 'react';
import 'gestalt/dist/gestalt.css';
import {Box, Spinner, Text} from 'gestalt'
import ShowItems from "./ShowItems"

const {Provider, Consumer} = React.createContext();
export {Consumer}

export default class App extends Component {

    constructor() {
        super()

        let api = {
            url: undefined,
            key: undefined,
        }

        let results = []

        let localStorage = window.localStorage.getItem("api");
        if (localStorage) {
            let parse = JSON.parse(localStorage);
            api.url = parse.url
            api.key = parse.key
        }

        this.isInititialized = this.isInititialized.bind(this)
        this.fetchResult = this.fetchResult.bind(this)

        this.state = {
            results: results,
            api: api,
            isInititialized: this.isInititialized
        }

        setTimeout(this.fetchResult, 400)


    }

    isInititialized() {
        return this.state.api.key && this.state.api.url;
    }

    fetchResult() {
        this.fetchType('ifttt_entered').then(r => {
            let results = this.state.results.concat(r.result).sort((a, b) => a.event_time - b.event_time)
            this.setState({results: results})
        })
        this.fetchType('ifttt_exited').then(r => {
            let results = this.state.results.concat(r.result).sort((a, b) => a.event_time - b.event_time)
            this.setState({results: results})
        })

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
                <Box justifyContent="center" padding={3} minWidth={200}>
                    <ShowItems/>
                    <Loading show={this.state.results.length === 0}/>
                </Box>
            </Provider>

        )
    }
}

let Loading = (props) => <Box display={props.show ? 'flex' : 'none'} alignItems="center" justifyContent="center">
    <Box padding={2}><Text size="lg">Loading</Text></Box>
    <Spinner show={true}/>
</Box>
