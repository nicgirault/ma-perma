import React from 'react'
import { withStyles } from 'material-ui/styles'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Typography from 'material-ui/Typography'
import * as Vegetable from '../../resources/Vegetable'
import history from '../../config/history'

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
        <Typography type='title'>
          Bibliothèque de plantes
        </Typography>
        <div className='grid-equalHeight'>
          {this.state.vegetables.map((vegetable, index) => (
            <div
              className='col-2_lg-3_md-4_sm-6_xs-6'
              key={index}
              style={{height: '200px'}}
              onClick={() => history.push(`/vegetable/${vegetable.urlName}`)}
            >
              <GridListTile role='button'>
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
