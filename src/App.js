import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import AppBar from './layout/AppBar'
import theme from './config/theme'
import Vegetables from './states/vegetables/List'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppBar />
          <Switch>
            <Route path={`/vegetables`} component={Vegetables}/>
            <Redirect to='/vegetables' />
          </Switch>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
