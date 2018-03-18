import React, {Component} from 'react';
import './App.css';
import {observer} from "mobx-react";
import InitForm from './InitForm'
import moment from 'moment'
import {ApiStore} from "./store";

let ShowItems = observer((props) => {
    return (<table>
        <tbody>
        {props.items.sort((a, b) => a.event_time - b.event_time).map(e =>
            <tr key={e.event_time}>
                <td>{moment(e.event_time).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{e.event_type} </td>
                <td>{e.lat && e.lon && <a href={"https://www.google.com/maps/?q=" + e.lat + "," + e.lon}>map</a>}</td>
            </tr>)}
        </tbody>
    </table>)
})

class App extends Component {

    constructor(props) {
        super(props)
        this.onTypeChanged = this.onTypeChanged.bind(this)
        this.store = new ApiStore()
    }

    onTypeChanged(e) {
        this.store.api.types[e.target.name] =!this.store.api.types[e.target.name]
    }

    render() {
        if (this.store.isInititialized()) {

            return (

                <div className="App">
                    <h1>Event List</h1>
                    <div>
                        {Object.keys(this.store.api.types).map(e => <span>
                            <input type="checkbox" name={e} checked={this.store.api.types[e]}
                                   onChange={this.onTypeChanged}/>
                            <label>{e}</label>
                        </span>)}
                    </div>
                    <span>{this.store.results.length}</span>
                    <ShowItems items={this.store.results}/>
                </div>

            );
        } else {
            return <InitForm api={this.store.api}/>
        }

    }
}

export default observer(App);
