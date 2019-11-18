import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'


const Thead = (props) => <thead>
  <tr>
    <td>{props.h1}</td> <td>{props.h2}</td>
  </tr>
</thead>

function ShowWorkItems(props) {
  const [events, setEvents] = useState([]);
  const securityContext = useContext(SecurityContext);
  useEffect(() => {
    if (events.length == 0) {
      let entered = fetchEvents("ifttt_entered", securityContext, 20)
      let exited = fetchEvents("ifttt_exited", securityContext, 20)

      Promise.all([entered, exited]).then((result) => {
        let events = result[0].result.concat(result[1].result).sort((a, b) => a.event_time - b.event_time)
        setEvents(events)
      })
    }
  })


  return (<div>
    <table>
      <Thead h1="type" h2="time" />
      <tbody>

        {
          events.map(v => {

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

export default ShowWorkItems;