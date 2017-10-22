import React from 'react'
import Typography from 'material-ui/Typography'
import * as Vegetable from '../../resources/Vegetable'
import { Content } from '../../layout/ContentElements'
import history from '../../config/history'
import { slugify } from '../../services/Vegetable'
import AddButton from '../../layout/atoms/AddButton'
import Grid from '../../layout/Grid'
import VegetableGridItem from '../common/VegetableGridItem'
import CreateVegetableDialog from './Create'

import 'gridlex/docs/gridlex.css'

class VegetableList extends React.Component {
  state = {
    vegetables: null,
    showCreate: false
  }
  componentDidMount () {
    this.fetchVegetables()
  }
  fetchVegetables () {
    Vegetable.get()
    .then((vegetables) => {
      this.setState({vegetables})
    })
  }
  render () {
    if (!this.state.vegetables) return null

    return (
      <Content>
        <Typography type='title'>
          Bibliothèque de plantes
        </Typography>
        <Grid>
          {this.state.vegetables.map((vegetable) => (
            <VegetableGridItem
              key={vegetable.id}
              vegetable={vegetable}
              onClick={() => history.push(`/vegetable/${slugify(vegetable)}`)}
            />
          ))}
        </Grid>
        <CreateVegetableDialog
          open={this.state.showCreate}
          onRequestClose={() => {
            this.setState({showCreate: false})
            this.fetchVegetables()
          }}
        />
        <AddButton onClick={() => this.setState({showCreate: true})} />
      </Content>
    )
  }
}

export default VegetableList
