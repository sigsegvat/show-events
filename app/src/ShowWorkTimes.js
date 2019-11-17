import React, { Component } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'


class ShowWorkItems extends Component {

  constructor(props) {
    super(props)
    this.state = { result: [] }
  }

  componentDidMount(){
    let entered = fetchEvents("ifttt_entered", this.context,20)
    let exited = fetchEvents("ifttt_exited", this.context,20)
    
    Promise.all([entered, exited]).then((result)=> {
        let events = result[0].result.concat(result[1].result).sort((a,b) => a.event_time - b.event_time)
        this.setState({
          result: events
        })
    })
   
  }

  render() {
    return (<div><h3>{this.props.title}</h3><table>
      <thead>
        <tr>
          <td>type</td> <td>time</td>
          </tr>
      </thead>
      <tbody>

        {
          this.state.result.map(v => {

            return <tr key={v.event_time}>
              <td>{v.event_type}</td>
              <td>{moment(v.event_time).format()}</td>
              <td>{v.temp}</td>
            </tr>
          })
        }
      </tbody>
    </table></div>)
  }

}

ShowWorkItems.contextType = SecurityContext

export default ShowWorkItems;