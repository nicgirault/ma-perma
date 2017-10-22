import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import AppBar from './layout/AppBar'
import theme from './config/theme'
import history from './config/history'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Vegetables from './states/vegetables/List'
import Vegetable from './states/vegetable/Layout'

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme} history={history}>
          <div>
            <AppBar />
            <Switch>
              <Route path='/vegetable/:vegetableSlug' component={Vegetable}/>
              <Route path='/vegetables' component={Vegetables}/>
              <Redirect to='/vegetables' />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
