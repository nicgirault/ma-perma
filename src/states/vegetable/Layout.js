import React from 'react'
import { withStyles } from 'material-ui/styles'
import * as Vegetable from '../../resources/Vegetable'
import Breadcrumb from '../../layout/Breadcrumb'
import { Content } from '../../layout/ContentElements'
import Typography from 'material-ui/Typography'
import { getIdFromSlug } from '../../services/Vegetable'

const styles = {
  body: {
    marginTop: '30px'
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover'
  }
}

class Layout extends React.Component {
  state = {
    vegetable: null
  }
  componentDidMount () {
    const vegetableId = getIdFromSlug(this.props.match.params.vegetableSlug)
    Vegetable.getById(vegetableId)
    .then((vegetable) => {
      this.setState({vegetable})
    })
  }
  render () {
    if (!this.state.vegetable) return null
    const {classes} = this.props
    return (
      <Content>
        <Breadcrumb path={[
          {
            state: '/vegetables',
            label: 'Bibliothèque de plantes'
          },
          {
            label: this.state.vegetable.name
          }
        ]} />
        <Typography type='title'>
          {this.state.vegetable.name}
        </Typography>
        <div className={classes.body}>
          <img src={this.state.vegetable.imageUrl} alt='vegetable' className={classes.image} />
        </div>
      </Content>
    )
  }
}

export default withStyles(styles)(Layout)
