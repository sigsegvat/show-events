import React, {Component} from 'react';
import './App.css';
import {observer, inject} from "mobx-react";
import InitForm from './InitForm'
import moment from 'moment'

let ShowItems = (props) => {
    return (<table>
        {props.items.map(e =>
            <tr key={e.event_time}>
                <td>{moment(e.event_time).toString()}</td>
                <td>{e.event_type} </td>
                <td>{e.lat} </td>
                <td>{e.lon} </td>
            </tr>)}
    </table>)
}

class App extends Component {

    constructor(props){
        super(props)
        this.onTypeChanged = this.onTypeChanged.bind(this)
    }

    onTypeChanged(e) {
        this.props.api.type = e.target.value
        this.props.fetch()
    }

    render() {
        if (this.props.isInititialized()) {

            return (
                <div className="App">
                    <h1>Event List</h1>
                    <select onChange={this.onTypeChanged} value={this.props.api.type}>
                        {this.props.eventTypes.map(e => <option value={e}>{e}</option>)}
                    </select>
                    <ShowItems items={this.props.results}/>
                </div>
            );
        } else {
            return <InitForm/>
        }

    }
}

export default inject(stores => stores.apiStore)(observer(App));
