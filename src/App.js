import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import AppBar from './layout/AppBar'
import theme from './config/theme'
import history from './config/history'
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Flowers from './states/flowers/List'
import Flower from './states/flower/Layout'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <div>
            <AppBar />
            <Switch>
              <Route
                path='/flower/:flowerSlug'
                component={({match, ...props}) => (
                  <Flower
                    {...props}
                    flowerSlug={match.params.flowerSlug}
                    key={match.params.flowerSlug}
                  />
                )}
              />
              <Route path='/flowers' component={Flowers}/>
              <Redirect to='/flowers' />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
