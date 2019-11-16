import React, { Component } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'

let fetchEvents = async function(eventType, token) {
  let response = await fetch("https://72e7e9muuf.execute-api.eu-west-1.amazonaws.com/prod/event/"+eventType+"?limit=20",
  { headers: {
    'Authorization': 'Bearer '+token
  }})
  return await response.json();
}

class ShowItems extends Component {
  constructor(props) {
    super(props)
    this.state = { result:[]}
    
  }
  componentDidMount(){
    fetchEvents(this.props.eventType, this.context).then((r)=>{
      this.setState(r);
  });
  }

  render() {
    return (<table>
      <thead>
      <th><td>temperature</td></th>
      </thead>
      <tbody>
    
      {
        this.state.result.map(v => {
          
        return <tr>
            <td>{moment(v.event_time).format()}</td>
          <td>{v.temp}</td>
          </tr>
        })
      }
      </tbody>
      </table>)
  }

}

ShowItems.contextType = SecurityContext

export default ShowItems;