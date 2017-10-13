import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import AppBar from './layout/AppBar'
import theme from './config/theme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar />
      </MuiThemeProvider>
    )
  }
}

export default App
