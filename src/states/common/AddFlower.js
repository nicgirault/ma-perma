import React from 'react'
import { withStyles } from 'material-ui/styles'

import { GridListTile } from 'material-ui/GridList'
import AddIcon from 'material-ui-icons/Add'

const style = theme => ({
  tile: {
    backgroundColor: '#eeeeee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    fill: '#aaaaaa'
  }
})

class AddFlower extends React.Component {
  render () {
    const {onClick, classes} = this.props
    return (
      <div
        className='col-3_lg-3_md-4_sm-6_xs-6'
        style={{height: '200px'}}
        title='Ajouter une plante'
        onClick={onClick}
      >
        <GridListTile role='button' classes={{tile: classes.tile}}>
          <AddIcon className={classes.icon} />
        </GridListTile>
      </div>
    )
  }
}

export default withStyles(style)(AddFlower)
