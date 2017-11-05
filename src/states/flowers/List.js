import React from 'react'
import Typography from 'material-ui/Typography'
import * as Flower from '../../resources/Flower'
import { Content } from '../../layout/ContentElements'
import history from '../../config/history'
import { slugify } from '../../services/Flower'
import AddButton from '../../layout/atoms/AddButton'
import Grid from '../../layout/Grid'
import FlowerGridItem from '../common/FlowerGridItem'
import CreateFlowerDialog from './Create'
import SearchField from './SearchField'

import 'gridlex/docs/gridlex.css'

class FlowerList extends React.Component {
  state = {
    flowers: null,
    showCreate: false,
    query: ''
  }
  componentDidMount () {
    this.fetchFlowers()
  }
  fetchFlowers () {
    Flower.get()
    .then((flowers) => {
      this.setState({flowers})
    })
  }
  render () {
    if (!this.state.flowers) return null

    return (
      <Content>
        <Typography type='title'>
          Bibliothèque de plantes
        </Typography>
        <SearchField
          value={this.state.query}
          onChange={(event) => this.setState({query: event.target.value})}
        />
        <Grid>
          {
            this.state.flowers
            .filter(flower => flower.name.match(new RegExp(this.state.query, 'i')))
            .map((flower) => (
              <FlowerGridItem
                key={flower.id}
                flower={flower}
                onClick={() => history.push(`/flower/${slugify(flower)}`)}
              />
            ))
          }
        </Grid>
        <CreateFlowerDialog
          open={this.state.showCreate}
          onRequestClose={() => {
            this.setState({showCreate: false})
            this.fetchFlowers()
          }}
        />
        <AddButton onClick={() => this.setState({showCreate: true})} />
      </Content>
    )
  }
}

export default FlowerList
