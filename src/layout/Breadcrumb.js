import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  separator: {
    padding: '0 5px'
  },
  item: {}
})

const BreadcrumbItem = withStyles(styles)(({classes, label, state}) => {
  let item = <Typography type='body1'>{label}</Typography>
  if (state) {
    item = <Link to={state}>{item}</Link>
  }

  return <span className={classes.item}>{item}</span>
})

const Separator = withStyles(styles)(({classes}) => {
  return <span className={classes.separator}>/</span>
})

function Breadcrumb(props) {
  const { classes, path } = props
  return (
    <div className={classes.root}>
      {
        path.reduce((accumulator, item, index) => {
          const breadcrumbItem = <BreadcrumbItem key={`breadcrumb-${index}`} state={item.state} label={item.label} />
          if (index === path.length - 1) return [...accumulator, breadcrumbItem]
          return [...accumulator, breadcrumbItem, <Separator key={`breadcrumb-sep-${index}`} />]
        }, [])
      }
    </div>
  )
}

export default withStyles(styles)(Breadcrumb)
