import React from 'react'
import { withStyles } from 'material-ui/styles'

import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import { typeLabels } from '../../services/Flower'

const style = {
  tileBarRoot: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 3
  },
  tileBarTitle: {
    color: '#262626',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tileBarSubtitle: {
    color: '#262626',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '12px',
  }
}

class FlowerGridItem extends React.Component {
  render () {
    const {flower, onClick, classes} = this.props
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
            subtitle={<span>{typeLabels[flower.type]}</span>}
            classes={{
              root: classes.tileBarRoot,
              title: classes.tileBarTitle,
              subtitle: classes.tileBarSubtitle
            }}
          />
        </GridListTile>
      </div>
    )
  }
}

export default withStyles(style)(FlowerGridItem)
