import React from 'react'
import { withStyles } from 'material-ui/styles'
import * as Vegetable from '../../resources/Vegetable'
import Breadcrumb from '../../layout/Breadcrumb'
import { Content } from '../../layout/ContentElements'
import Typography from 'material-ui/Typography'
import { getIdFromSlug } from '../../services/Vegetable'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/AddCircleOutline'
import Grid from '../../layout/Grid'
import VegetableGridItem from '../common/VegetableGridItem'
import CreateAssociationDialog from './CreateAssociation'

const styles = {
  body: {
    marginTop: '30px'
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover'
  },
  associations: {
    marginTop: '48px'
  },
  associationsHeader: {
    display: 'flex',
    alignItems: 'center'
  }
}

class Layout extends React.Component {
  state = {
    vegetable: null,
    vegetablesMap: null,
    showAssociation: false,
    isPositive: null
  }
  componentDidMount () {
    this.fetchContent()
  }
  fetchContent () {
    const vegetableId = getIdFromSlug(this.props.match.params.vegetableSlug)
    Promise.all([
      Vegetable.getById(vegetableId),
      Vegetable.get()
    ]).then(([vegetable, vegetables]) => {
      const vegetablesMap = vegetables.reduce((map, vegetable) => {
        map[vegetable.id] = vegetable
        return map
      }, {})
      this.setState({vegetable, vegetablesMap})
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
        <div className={classes.associations}>
          <div className={classes.associationsHeader}>
            <Typography type='headline'>
              Associations à privilégier
            </Typography>
            <IconButton
              aria-label="Add positive association"
              onClick={() => this.setState({showAssociation: true, isPositive: true})}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Grid>
            {this.state.vegetable.positiveAssociations.map((vegetableId) => (
              <VegetableGridItem
                key={`positive-association-${vegetableId}`}
                vegetable={this.state.vegetablesMap[vegetableId]}
              />
            ))}
          </Grid>
          <div className={classes.associationsHeader}>
            <Typography type='headline'>
              Associations à éviter
            </Typography>
            <IconButton
              aria-label="Add negative association"
              onClick={() => this.setState({showAssociation: true, isPositive: false})}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Grid>
            {this.state.vegetable.negativeAssociations.map((vegetableId) => (
              <VegetableGridItem
                key={`negative-association-${vegetableId}`}
                vegetable={this.state.vegetablesMap[vegetableId]}
              />
            ))}
          </Grid>
        </div>
        <CreateAssociationDialog
          open={this.state.showAssociation}
          onRequestClose={() => {
            this.setState({showAssociation: false, isPositive: null})
            this.fetchContent()
          }}
          isPositive={this.state.isPositive}
          vegetable={this.state.vegetable}
        />
      </Content>
    )
  }
}

export default withStyles(styles)(Layout)
