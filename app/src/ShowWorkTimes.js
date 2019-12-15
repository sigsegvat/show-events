import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'

const Grid = styled.div` 
  display: grid;
  grid-template-columns: repeat(5,100px);
  grid-template-rows: 20px;
  grid-auto-rows: auto;
`

const Box = styled.div`
  border: 1px dotted;
  padding: 5px 3px;
  display:block;
  grid-column-start: ${props => props.dayOfWeek}
`

const Event = styled.span`
  display: block;
  text-align: ${props => props.eventType === 'ifttt_entered' ? 'left' : 'right'};
  padding: 2px;
`

const DayMarker = styled.span` 
display: block;
text-align: center;
background-color: #73CAD1;
`

function ShowWorkItems(props) {
  const [events, setEvents] = useState([]);
  const securityContext = useContext(SecurityContext);
  useEffect(() => {
    if (events.length === 0) {
      let entered = fetchEvents("ifttt_entered", securityContext, 20)
      let exited = fetchEvents("ifttt_exited", securityContext, 20)

      Promise.all([entered, exited]).then((result) => {
        let events = result[0].result.concat(result[1].result).sort((a, b) => a.event_time - b.event_time)
        let calendar = events.reduce((acc,curr)=>{
          let dayOfMonth = moment(curr.event_time).format("MM-DD");
          if(acc[dayOfMonth]){
            acc[dayOfMonth].events.push(curr)
          }else {
            acc[dayOfMonth] = {
              dayOfMonth: dayOfMonth,
              events:[curr]
            }

          }
          return acc;
        },{})
        setEvents(calendar)
      })
    }
  })
console.log(events)
  return (<Grid>
<Box>Mo</Box><Box>Di</Box><Box>Mi</Box><Box>Do</Box><Box>Fr</Box>
        {
          
          Object.values(events).map((v,i) => {

            return  <Box key={i}  dayOfWeek={moment(v.events[0].event_time).format("d")}>
<DayMarker>{moment(v.events[0].event_time).format("dd Do")}</DayMarker>
                {v.events.map((e,ii)=>    <Event key={ii} eventType={e.event_type}>
                  {moment(e.event_time).format("HH:mm")}</Event>
                )}

          </Box>
          
        })
      }
      </Grid>)


}


export default ShowWorkItems;