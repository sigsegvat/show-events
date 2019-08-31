import React, { Component } from 'react'
import DynamoDbApi from './aws/DynamoDb'
import { Box, SelectList } from 'gestalt'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import moment from 'moment/moment'

export default class ShowSensor extends Component {

  constructor (props) {
    super(props)
    this.state = {data: [], range: 100}

  }

  componentDidMount () {
    this.fetchResults()
  }

  fetchResults = () => {
    DynamoDbApi.getEvents('sensor1', this.state.range).then(p => this.processResult(p))
  }

  handleRangeChange = (e) => {
    console.log(e)
    this.setState({range: parseInt(e.value)}, this.fetchResults)
  }

  processResult (p) {

    let data = p.Items.map(i => {
      let timeNumber = parseInt(i.event_time.N)
      let time = moment(timeNumber).format('DD.MM. HH:mm')
      return {
        name: time,
        time: timeNumber,
        temp: parseFloat(i.temp.S),
        hum: parseFloat(i.hum.S),
        hpasc: parseFloat(i.hpasc != null ? i.hpasc.S : null)
      }
    }).sort((a, b) => a.time - b.time)

    this.setState({data: data})

  }

  rangeOptions = [
    {
      value: '120',
      label: '10 hours'
    },
    {
      value: '288',
      label: '24 hours'
    },
    {
      value: '1000',
      label: '3 days'
    }
  ]

  render () {

    return (<Box>
      <Box>
        <SelectList
          name="range"
          id="rangeSelector"
          onChange={this.handleRangeChange}
          options={this.rangeOptions}
          placeholder="Select Range"
          value={this.state.range + ''}
        /></Box>
      <Box>
        <LineChart isAnimationActive={false} margin={ {top: 0, right: 0, bottom: 0, left: 0} }
                   width={800} height={400} data={this.state.data}>
          <Line yAxisId="temp" type="monotone" dot={false} activeDot={{r: 8}} dataKey="temp" stroke="#8884d8"/>
          <Line yAxisId="hum" type="monotone" dot={false} dataKey="hum" stroke="#1884d8"/>
          <Line yAxisId="hpasc" type="monotone" dot={false} dataKey="hpasc" stroke="#1814d8"/>
          <XAxis dataKey="name"/>
          <YAxis yAxisId="hum" unit="%" domain={['dataMin - 10', 'dataMax + 10']}/>
          <YAxis yAxisId="hpasc" unit="hP" orientation="right" domain={['dataMin - 10', 'dataMax + 10']}/>
          <YAxis yAxisId="temp" unit="°C" domain={[-5, 30]}/>

          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
        </LineChart>
      </Box>
    </Box>)
  }
}