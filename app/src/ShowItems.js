import React, {Component} from 'react';
import './App.css';
import 'gestalt/dist/gestalt.css';
import {Box, Link, Icon, Checkbox, Label, Text, Heading, Column} from 'gestalt'
import {Consumer} from "./App";


let TimeOfDay = (t) => {

    let exited = (t.type === 'ifttt_exited');
    return <Box display="flex" justifyContent="end" alignItems="center"
                shape={exited ? "roundedRight" : "roundedLeft"}
                width={exited ? (t.elapsed * 100 - 50) : 70}
                padding={1} color="lightGray">
        <Icon accessibilityLabel="icon" size={11} color={exited ? 'red' : 'green'} inline={true} icon="arrow-back"/>
        <Box display="flex" paddingX={1}>
            <Text align="right">{t.time}</Text>
        </Box>
    </Box>
}


let ShowItems = (props) => {
    return <Consumer>
        {({results, getResultsByDate}) => {
            let resultsByDate = getResultsByDate();

            return <Box>
                {Object.keys(resultsByDate).map(e =>
                    <Box display="flex" direction="row" paddingY={2} key={e}>
                        <Column>
                            <Box marginRight={2} padding={1}><Text bold={true}>{e}</Text></Box>
                        </Column>
                        <Column>
                            <Box display="flex">
                                {resultsByDate[e].map(t => <div key={e+t.time}><TimeOfDay type={t.type} time={t.time}
                                                                                   elapsed={t.elapsed}/></div>)}
                            </Box>
                        </Column>
                    </Box>)}
            </Box>
        }}
    </Consumer>
}

export default ShowItems