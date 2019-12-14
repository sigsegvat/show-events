import React, { Component, useEffect, useState, useContext } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'

let ShowTemp = (props) => {
    const [events, setEvents] = useState([]);
    const securityContext = useContext(SecurityContext);
    useEffect(async () => {
        let fetchedEvents = await fetchEvents("door_tag", securityContext, 200)
        console.log(fetchedEvents)
        setEvents(fetchedEvents.result)
    },{})
    let min = Math.min(...events.map(r => r.event_time))
    let max = Math.max(...events.map(r => r.event_time))
    events.reverse()
    let temppoints = events.map(v => 200*(v.event_time -min)/(max-min)  +","+(v.temp*10)).join(" ")
    let batpoints = events.map(v => 200*(v.event_time -min)/(max-min)  +","+(v.bat)).join(" ")
    let humpoints = events.map(v => 200*(v.event_time -min)/(max-min)  +","+(v.hum)).join(" ")
    return <div>
        <svg height="100" widht="200" >
            <polyline points={"0,100 " +temppoints + " 200,100"} />
        </svg>
        <svg height="100" widht="200" >
            <polyline points={"0,100 " +batpoints + " 200,100"} />
        </svg>
        <svg height="100" widht="200" >
            <polyline points={"0,100 " +humpoints + " 200,100"} />
        </svg>
    </div>

}

export default ShowTemp