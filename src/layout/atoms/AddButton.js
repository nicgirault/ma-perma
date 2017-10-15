import React from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const AddButton = (props) => {
  const { classes, ...buttonProps } = props
  return (
    <Button fab color="primary" aria-label="add" className={classes.button} {...buttonProps}>
      <AddIcon />
    </Button>
  )
}

export default withStyles(styles)(AddButton)
