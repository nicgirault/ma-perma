import React from 'react'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'

class FlowerGridItem extends React.Component {
  render () {
    const {flower, onClick} = this.props
    return (
      <div
        className='col-3_lg-3_md-4_sm-6_xs-6'
        key={flower.id}
        style={{height: '200px'}}
        onClick={onClick}
      >
        <GridListTile role='button'>
          <img src={flower.imageUrl} alt={flower.name} />
          <GridListTileBar
            title={flower.name}
            subtitle={<span>{flower.type}</span>}
          />
        </GridListTile>
      </div>
    )
  }
}

export default FlowerGridItem
