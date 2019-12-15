import React, {  useEffect, useState, useContext } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'

let PolyLine = (props) => {
    let dataMin = Math.min(...props.events.map(r => r.data))
    let dataMax = Math.max(...props.events.map(r => r.data))
    let points = props.events.map(v => props.width*(v.event_time -props.min)/(props.max-props.min)  
        +","+(props.height*(1-(v.data-dataMin)/(dataMax - dataMin)))).join(" ")
    
    

    return <g><polyline stroke={props.color} fill="none" points={points} />

<text x={0} y={18* props.height / 20 }>{dataMin}{props.unit}</text>
<text x={0} y={2* props.height / 20 }>{dataMax}{props.unit}</text>
    </g>
}

let ShowTemp = (props) => {
    const [events, setEvents] = useState([]);
    const securityContext = useContext(SecurityContext);
    useEffect( () => {
        let f = async () => {
        let fetchedEvents = await fetchEvents("door_tag", securityContext, 200)
        console.log(fetchedEvents)
        fetchedEvents.result.reverse();
        setEvents(fetchedEvents.result)
        }
        f();
    },[securityContext])
    let min = Math.min(...events.map(r => r.event_time))
    let max = Math.max(...events.map(r => r.event_time))
    

    return <div>
        <svg height="100" widht="200" >
            <PolyLine color="red" unit="°C" events={events.map(v => ({event_time: v.event_time, data: v.temp}))}
             min={min} max={max} width={200} height={100}></PolyLine>
        </svg>
        <svg height="100" widht="200" >
        <PolyLine color="green" unit="V" events={events.map(v => ({event_time: v.event_time, data: v.bat}))} 
        min={min} max={max} width={200} height={100}></PolyLine>
        </svg>
        <svg height="100" widht="200" unit="%h">
        <PolyLine color="blue" events={events.map(v => ({event_time: v.event_time, data: v.hum}))} 
        min={min} max={max} width={200} height={100}></PolyLine>
   
        </svg>
        <p>{moment(min).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>{moment(max).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>

}

export default ShowTemp