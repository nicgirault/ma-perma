import React from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'

import logo from './assets/logo.png'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#7A3D60'
  },
  flex: {
    flex: 1,
  },
})

function ButtonAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt='logo' />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(ButtonAppBar)
