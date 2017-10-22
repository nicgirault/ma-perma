import React from 'react'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'

class VegetableGridItem extends React.Component {
  render () {
    const {vegetable, onClick} = this.props
    return (
      <div
        className='col-3_lg-3_md-4_sm-6_xs-6'
        key={vegetable.id}
        style={{height: '200px'}}
        onClick={onClick}
      >
        <GridListTile role='button'>
          <img src={vegetable.imageUrl} alt={vegetable.name} />
          <GridListTileBar
            title={vegetable.name}
            subtitle={<span>{vegetable.category.name}</span>}
          />
        </GridListTile>
      </div>
    )
  }
}

export default VegetableGridItem
