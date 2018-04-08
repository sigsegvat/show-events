import React, {Component} from 'react';
import './App.css';
import InitForm from './InitForm'
import 'gestalt/dist/gestalt.css';
import {Box, Link, Icon, Divider, Checkbox, Label, Text, Heading, Column} from 'gestalt'
import moment from 'moment'
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
        this.getResultsByDate = this.getResultsByDate.bind(this)

        this.state = {
            results: results,
            api: api,
            isInititialized: this.isInititialized,
            getResultsByDate: this.getResultsByDate
        }

        this.fetchResult()


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

    getResultsByDate() {
        return this.state.results.reduce((map, current) => {
            let month = moment(current.event_time).format('DD.MM.')
            let time = moment(current.event_time).format('HH:mm')
            let day = (parseInt(moment(current.event_time).format('HH')) +
                parseInt(moment(current.event_time).format('mm')) / 60) / 8
            if (!map) {
                map = {}
            }
            if (!map[month]) {
                map[month] = []
            }
            map[month] = map[month].concat({type: current.event_type, time: time, elapsed: day})
            return map
        }, {})
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
                <Box justifyContent="center" padding={3}>
                    <ShowItems/>
                </Box>
            </Provider>

        )
    }
}


