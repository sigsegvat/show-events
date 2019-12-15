import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import SecurityContext from './SecurityContext'
import fetchEvents from './eventApi'
import styled from 'styled-components'


let LineChart = (props) => {
    let dataMin = Math.min(...props.events.map(r => r.data))
    let dataMax = Math.max(...props.events.map(r => r.data))
    let points = props.events.map(v => props.width * (v.event_time - props.min) / (props.max - props.min)
        + "," + (props.height * (1 - (v.data - dataMin) / (dataMax - dataMin)))).join(" ")


    let Svg = styled.svg` display:block; margin: 10px;`

    return <Svg height={props.height} width={props.width} >
        <g>
            <polyline stroke={props.color} fill="none" points={points} />
            <text x={0} y={18 * props.height / 20}>{dataMin}{props.unit}</text>
            <text x={0} y={2 * props.height / 20}>{dataMax}{props.unit}</text>
        </g>
    </Svg>
}

let DaySelect = (props) => {
    let Wrapper = styled.div`
        display: grid;
        grid-template-columns: repeat(5,90px);
        grid-template-rows: 40px;
        grid-column-gap: 10px;
        grid-row-gap: 15px;
    `

    let Day = (props) => <div onClick={()=>props.selectDay(props.date)} 
    className={props.className}>{props.date.format('Do/MM')}</div>

    let StyledDay = styled(Day)`
        border: 1px dotted;
        padding: 5px;
        :hover {
            background-color: #FFF29C;
        }
    `

    return <Wrapper>
        <StyledDay selectDay={props.selectDay} date={moment().subtract(4, 'days')}/>
        <StyledDay selectDay={props.selectDay} date={moment().subtract(3, 'days')}/>
        <StyledDay selectDay={props.selectDay} date={moment().subtract(2, 'days')}/>
        <StyledDay selectDay={props.selectDay} date={moment().subtract(1, 'days')}/>
        <StyledDay selectDay={props.selectDay} date={moment()}/>
    </Wrapper>
}

let ShowGraphs = (props) => {
    const [events, setEvents] = useState([]);
    const [after, setAfter] = useState([]);
    const [before, setBefore] = useState([]);
    const securityContext = useContext(SecurityContext);
    useEffect(() => {
        let f = async () => {
            let fetchedEvents = await fetchEvents("door_tag", securityContext, 1000, after, before)

            fetchedEvents.result.reverse();
            let results = fetchedEvents.result.filter(v => v.bat > 0 && v.bat < 5 && v.temp < 45)
            setEvents(results)
        }
        f();
    }, [securityContext, after, before])
    let min = Math.min(...events.map(r => r.event_time))
    let max = Math.max(...events.map(r => r.event_time))


    return <div>

        <DaySelect selectDay={(day) => { setAfter(day.startOf('day').format("x")); setBefore(day.endOf('day').format("x")) }}/>
        <LineChart color="red" unit="°C" events={events.map(v => ({ event_time: v.event_time, data: v.temp }))}
            min={min} max={max} width={400} height={200}></LineChart>

        <LineChart color="green" unit="V" events={events.map(v => ({ event_time: v.event_time, data: v.bat }))}
            min={min} max={max} width={400} height={100}></LineChart>

        <LineChart color="blue" events={events.map(v => ({ event_time: v.event_time, data: v.hum }))}
            min={min} max={max} width={400} height={100}></LineChart>

        <LineChart color="blue" events={events.map(v => ({ event_time: v.event_time, data: v.pres }))}
            min={min} max={max} width={400} height={100}></LineChart>

        <p>{moment(min).format('MMM Do YYYY, HH:mm')}</p>
        <p>{moment(max).format('MMM Do YYYY, HH:mm')}</p>
    </div>

}

export default ShowGraphs