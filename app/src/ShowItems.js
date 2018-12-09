import React, { Component } from 'react'
import { Box, Icon, Text, Column } from 'gestalt'

import moment from 'moment/moment'
import DynamoDbApi from './aws/DynamoDb'

let fetchResults = () => {

  let onFulfilled = (r) => {
    return r.Items.map((i) => {
      return {event_time: parseInt(i.event_time.N), event_type: i.event_type.S}
    })
  }

  let r1 = DynamoDbApi.getEvents('ifttt_exited').then(onFulfilled)
  let r2 = DynamoDbApi.getEvents('ifttt_entered').then(onFulfilled)

  return Promise.all([r1, r2]).then(([entered, exited]) => {
    return {
      results: entered.concat(exited).sort((a, b) => a.event_time - b.event_time)
    }
  })

}

let resultsByDate = (results) => {
  return results.reduce((map, current) => {
    let month = moment(current.event_time).format('DD.MM.')
    let time = moment(current.event_time).format('HH:mm')
    let day = (parseInt(moment(current.event_time).format('HH')) +
      parseInt(moment(current.event_time).format('mm')) / 60) / 8
    if (!map) {
      map = {}
    }
    if (!map[month]) {
      map[month] = []
    }
    map[month] = map[month].concat({type: current.event_type, time: time, elapsed: day})
    return map
  }, {})
}

let TimeOfDay = (t) => {
  let exited = (t.type === 'ifttt_exited')
  return <Box display="flex" justifyContent="end" alignItems="center"
              shape={exited ? 'roundedRight' : 'roundedLeft'}
              width={exited ? (t.elapsed * 100 - 50) : 70}
              padding={1} color="lightGray">
    <Icon accessibilityLabel="icon" size={11} color={exited ? 'red' : 'green'} inline={true}
          icon={'arrow-' + (exited ? 'back' : 'forward')}/>
    <Box display="flex" paddingX={1}>
      <Text align="right">{t.time}</Text>
    </Box>
  </Box>
}

let ShowItems = (props) => <Box>
  {Object.keys(props.results).map(e =>
    <Box display="flex" direction="row" paddingY={2} key={e}>
      <Column>
        <Box marginRight={2} padding={1}><Text bold={true}>{e}</Text></Box>
      </Column>
      <Column>
        <Box display="flex">
          {props.results[e].map(t => <div key={e + t.time}>
            <TimeOfDay type={t.type} time={t.time}
                       elapsed={t.elapsed}/>
          </div>)}
        </Box>
      </Column>
    </Box>)}
</Box>


export default class Items extends Component {
  constructor(){
    super()
    this.state = { results: []}
  }

  componentDidMount () {
    fetchResults().then((r) => this.setState(r))
  }

  render() {
    return (<ShowItems results={resultsByDate(this.state.results)}/>)
  }
}