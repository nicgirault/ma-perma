import React from 'react'
import { withStyles } from 'material-ui/styles'

import 'gridlex/docs/gridlex.css'

const styles = theme => ({
  listContainer: {
    padding: '0 0.5em'
  },
  list: {
    listStyle: 'none',
    marginTop: '20px'
  },
})

class Grid extends React.Component {
  render () {
    const { classes, children } = this.props

    return (
      <div className={classes.listContainer}>
        <div className={classes.list + ' grid-equalHeight'}>
          {children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Grid)
