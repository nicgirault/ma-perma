import React from 'react'
import { withStyles } from 'material-ui/styles'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import * as Vegetable from '../../resources/Vegetable'

import 'gridlex/docs/gridlex.css'

const styles = theme => ({
  container: {
    background: theme.palette.background.paper,
    padding: 12,
    listStyle: 'none'
  },
})

class VegetableList extends React.Component {
  state = {
    vegetables: null
  }
  componentDidMount () {
    Vegetable.get()
    .then((vegetables) => {
      this.setState({vegetables})
    })
  }
  render () {
    const { classes } = this.props

    if (!this.state.vegetables) return null

    return (
      <div className={classes.container}>
        <div className='grid-equalHeight'>
          {this.state.vegetables.map((vegetable, index) => (
            <div
              className='col-2_lg-3_md-4_sm-6_xs-6'
              key={index}
              style={{height: '200px'}}
            >
              <GridListTile>
                <img src={vegetable.img} alt={vegetable.name} />
                <GridListTileBar
                  title={vegetable.name}
                  subtitle={<span>{vegetable.category}</span>}
                />
              </GridListTile>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(VegetableList)
