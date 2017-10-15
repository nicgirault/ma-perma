import React from 'react'
import { withStyles } from 'material-ui/styles'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Typography from 'material-ui/Typography'
import * as Vegetable from '../../resources/Vegetable'
import {Content} from '../../layout/ContentElements'
import history from '../../config/history'
import AddButton from '../../layout/atoms/AddButton'
import CreateVegetableDialog from './Create'

import 'gridlex/docs/gridlex.css'

const styles = theme => ({
  list: {
    listStyle: 'none',
    marginTop: '20px'
  },
})

class VegetableList extends React.Component {
  state = {
    vegetables: null,
    showCreate: false
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
      <Content>
        <Typography type='title'>
          Bibliothèque de plantes
        </Typography>
        <div className={classes.list + ' grid-equalHeight'}>
          {this.state.vegetables.map((vegetable, index) => (
            <div
              className='col-3_lg-3_md-4_sm-6_xs-6'
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
        <CreateVegetableDialog
          open={this.state.showCreate}
          onRequestClose={() => this.setState({showCreate: false})}
        />
        <AddButton onClick={() => this.setState({showCreate: true})} />
      </Content>
    )
  }
}

export default withStyles(styles)(VegetableList)
