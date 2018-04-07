import React, {Component} from 'react';
import './App.css';
import InitForm from './InitForm'
import moment from 'moment'
import Store, {ApiStore} from "./store";


let ShowItems = (props) => {
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
}

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <Store.ApiStore>
            <Store.Consumer>
                {({isInititialized, api, results, toggleType}) => {
                    if (isInititialized()) {
                        return (<div className="App">
                            <h1>Event List</h1>
                            <div>
                                {Object.keys(api.types).map(e => <span>
                            <input type="checkbox" name={e} checked={api.types[e]}
                                   onChange={(e) => toggleType(e.target.name)}/>
                            <label>{e}</label>
                        </span>)}
                            </div>
                            <span>{results.length}</span>
                            <ShowItems items={results}/>
                        </div>)
                    }
                    else {
                        return <InitForm api={api}/>
                    }

                }
                }
            </Store.Consumer>
        </Store.ApiStore>
    }
}

export default App

