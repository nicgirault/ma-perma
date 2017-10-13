import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = {
  container: {
    margin: '30px auto',
    padding: '0 .5em',
    maxWidth: '825px'
  }
}

class _Content extends React.Component {
  render () {
    const {classes, children, props} = this.props
    return (
      <div className={classes.container} {...props}>
        {children}
      </div>
    )
  }
}

export const Content = withStyles(styles)(_Content)
