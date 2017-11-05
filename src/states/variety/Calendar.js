import React from 'react'
import { withStyles } from 'material-ui/styles'

import { monthsShort } from 'moment'

const calendarColors = {
  'plantation ou repiquage': {
    primary: '#3DBA63',
    secondary: '#83E2A0'
  },
  'récolte': {
    primary: '#22A4AB',
    secondary: '#B8EFF2'
  },
  default: {
    primary: '#3DBA63',
    secondary: '#83E2A0'
  }
}

const styles = theme => ({
  root: {
    border: 'solid 1px',
    width: 210,
  },
  title: {
    fontFamily: 'Lato',
    fontSize: '14px',
    textAlign: 'center'
  },
  months: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  month: {
    width: 35,
    height: 33,
    fontFamily: 'Lato',
    fontSize: '12px',
    textAlign: 'center',
    lineHeight: '35px'
  }
})

class Calendar extends React.Component {
  render () {
    const {months, title, classes} = this.props

    const colors = calendarColors[title] || calendarColors.default

    return (
      <div
        className={classes.root}
        style={{
          borderColor: colors.primary
        }}
      >
        <h3
          className={classes.title}
          style={{color: colors.primary}}
        >{title}</h3>
        <div className={classes.months}>
          {
            monthsShort().map((month, index) => (
              <div
                key={`${title}-${month}`}
                className={classes.month}
                style={{backgroundColor: months.indexOf(index) > -1 ? colors.secondary : 'transparent'}}
              >{month}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Calendar)
