import React, { Component } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'


class ShowItems extends Component {

  constructor(props) {
    super(props)
    this.state = { result: [] }
  }

  componentDidMount(){
    fetchEvents(this.props.eventType, this.context,20).then((r) => {
      this.setState(r);
    });
  }

  render() {
    return (<div><table>
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

ShowItems.contextType = SecurityContext

export default ShowItems;