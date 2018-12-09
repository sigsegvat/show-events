
import React, { Component } from 'react'
import { Box, Spinner, Text, Tabs } from 'gestalt'

export default Loading = (props) => <Box display={props.show ? 'flex' : 'none'} alignItems="center" justifyContent="center">
  <Box padding={2}><Text size="lg">Loading</Text></Box>
  <Spinner show={true} accessibilityLabel="spinner"/>
</Box>