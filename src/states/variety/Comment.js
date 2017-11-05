import React from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'

const style = theme => ({
  root: {
    marginBottom: 15,
    fontSize: '14px',
    fontFamily: 'Lato'
  },
  owner: {
    fontWeight: 'bold'
  },
  date: {
  },
  text: {
    marginTop: 5
  }
})

class Comment extends React.Component {
  render () {
    const {classes, comment} = this.props
    return (
      <div className={classes.root}>
        <span className={classes.owner}>{comment.owner}</span>
        <span className={classes.date}> / {moment(comment.updatedAt).fromNow()}</span>
        <div className={classes.text}>{comment.text}</div>
      </div>
    )
  }
}

export default withStyles(style)(Comment)
