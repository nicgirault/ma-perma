import React from 'react'
import { withStyles } from 'material-ui/styles'
import * as Flower from '../../resources/Flower'
import Breadcrumb from '../../layout/Breadcrumb'
import { Content } from '../../layout/ContentElements'
import Typography from 'material-ui/Typography'
import { getIdFromSlug } from '../../services/Flower'
import history from '../../config/history'
import { slugify } from '../../services/Flower'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/AddCircleOutline'
import Grid from '../../layout/Grid'
import FlowerGridItem from '../common/FlowerGridItem'
import Calendar from './Calendar'
import Properties from './Properties'
import CreateAssociationDialog from './CreateAssociation'

const styles = {
  body: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover'
  },
  calendars: {

  },
  calendar: {
    marginTop: 10,
    marginBottom: 10
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
    flower: null,
    flowersMap: null,
    showAssociation: false,
    type: null
  }
  componentDidMount () {
    this.fetchContent()
  }
  fetchContent () {
    const flowerId = getIdFromSlug(this.props.flowerSlug)
    Promise.all([
      Flower.getById(flowerId),
      Flower.get()
    ]).then(([flower, flowers]) => {
      const flowersMap = flowers.reduce((map, flower) => {
        map[flower.id] = flower
        return map
      }, {})
      this.setState({flower, flowersMap})
    })
  }
  render () {
    if (!this.state.flower) return null
    const {classes} = this.props
    return (
      <Content>
        <Breadcrumb path={[
          {
            state: '/flowers',
            label: 'Bibliothèque de plantes'
          },
          {
            label: this.state.flower.name
          }
        ]} />
        <Typography type='title'>
          {this.state.flower.name}
        </Typography>
        <div className={classes.body}>
          <img src={this.state.flower.imageUrl} alt='flower' className={classes.image} />
          <Properties properties={this.state.flower.properties} />
          <div className={classes.calendars}>
            {
              this.state.flower.properties
              .filter(flowerProperty => flowerProperty.property.type === 'CALENDAR')
              .map((flowerProperty, index) => (
                <div key={`calendar-${index}`} className={classes.calendar}>
                  <Calendar
                    title={flowerProperty.property.name}
                    months={flowerProperty.value.split('-').map((m) => parseInt(m, 10) - 1)}
                    color=''
                  />
                </div>
              ))
            }
          </div>
        </div>


        <div className={classes.associations}>
          <div className={classes.associationsHeader}>
            <Typography type='headline'>
              Associations à privilégier
            </Typography>
            <IconButton
              aria-label="Add positive association"
              onClick={() => this.setState({showAssociation: true, type: 'ASSOCIATE_WITH'})}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Grid>
            {
              this.state.flower.relations
              .filter((relation) => relation.type === 'ASSOCIATE_WITH')
              .map((relation, index) => {
                const flower = this.state.flowersMap[relation.flowerAId === this.state.flower.id ? relation.flowerBId : relation.flowerAId]
                return (
                  <FlowerGridItem
                    key={`positive-association-${index}`}
                    flower={flower}
                    onClick={() => history.push(`/flower/${slugify(flower)}`)}
                  />
                )
              })
            }
          </Grid>
          <div className={classes.associationsHeader}>
            <Typography type='headline'>
              Associations à éviter
            </Typography>
            <IconButton
              aria-label="Add negative association"
              onClick={() => this.setState({showAssociation: true, type: 'DONT_ASSOCIATE_WITH'})}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Grid>
            {
              this.state.flower.relations
              .filter((relation) => relation.type === 'DONT_ASSOCIATE_WITH')
              .map((relation, index) => {
                const flower = this.state.flowersMap[relation.flowerAId === this.state.flower.id ? relation.flowerBId : relation.flowerAId]
                return (
                  <FlowerGridItem
                    key={`negative-association-${index}`}
                    flower={flower}
                    onClick={() => history.push(`/flower/${slugify(flower)}`)}
                  />
                )
              })
            }
          </Grid>
        </div>
        <CreateAssociationDialog
          open={this.state.showAssociation}
          onRequestClose={() => {
            this.setState({showAssociation: false, type: null})
            this.fetchContent()
          }}
          type={this.state.type}
          flower={this.state.flower}
        />
      </Content>
    )
  }
}

export default withStyles(styles)(Layout)
