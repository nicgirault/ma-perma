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
import Illustration from './Illustration'
import Description from './Description'
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
    display: 'flex',
    flexWrap: 'wrap'
  },
  calendar: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
  updateImage (newImageUrl) {
    Flower.update(this.state.flower.id, {imageUrl: newImageUrl})
    .then(() => this.fetchContent())
  }
  updateDescription (description) {
    Flower.update(this.state.flower.id, {description})
    .then(() => this.fetchContent())
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
          <Grid>
            <div className='col-3_xs-12-sm-4_md-4_lg-3'>
              <Illustration
                src={this.state.flower.imageUrl}
                handleUpdate={(newImageUrl) => this.updateImage(newImageUrl)}
              />
            </div>
            <div className='col-9_xs-12-sm-8_md-8_lg-9'>
              <Description
                markdown={this.state.flower.description}
                handleUpdate={(newDescription) => this.updateDescription(newDescription)}
              />
            </div>
            <div className='col-2_xs-12-sm-6_md-6_lg-6'>
              <div className={classes.calendars}>
                {
                  this.state.flower.properties
                  .filter(flowerProperty => flowerProperty.property.type === 'CALENDAR')
                  .sort((a, b) => {
                    const aFirstMonth = parseInt(a.value.split('-'), 10)
                    const bFirstMonth = parseInt(b.value.split('-'), 10)
                    if (aFirstMonth > bFirstMonth) return 1
                    if (aFirstMonth < bFirstMonth) return -1
                    return 0
                  })
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
            <div className='col-2_xs-12-sm-6_md-6_lg-6'>
              <Properties properties={this.state.flower.properties} />
            </div>
          </Grid>
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
