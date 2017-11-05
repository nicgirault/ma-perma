import React from 'react'
import { withStyles } from 'material-ui/styles'
import * as Flower from '../../resources/Flower'
import Breadcrumb from '../../layout/Breadcrumb'
import { Content } from '../../layout/ContentElements'
import Typography from 'material-ui/Typography'
import { getIdFromSlug } from '../../services/Flower'
import history from '../../config/history'
import { slugify } from '../../services/Flower'
import Grid from '../../layout/Grid'
import FlowerGridItem from '../common/FlowerGridItem'
import AddButton from '../common/AddFlower'
import Calendar from './Calendar'
import Properties from './Properties'
import Illustration from './Illustration'
import CreateAssociationDialog from './CreateAssociation'
import CreateVarietyDialog from './CreateVariety'

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
  varieties: {
    marginTop: '48px'
  },
}

class Layout extends React.Component {
  state = {
    flower: null,
    flowersMap: null,
    showAssociation: false,
    showVariety: false,
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
          <Illustration
            src={this.state.flower.imageUrl}
            handleUpdate={(newImageUrl) => this.updateImage(newImageUrl)}
          />
          <Properties properties={this.state.flower.properties} />
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

        <div className={classes.associations}>
          <Typography type='headline'>
            Associations à privilégier
          </Typography>
          <Grid>
            <AddButton
              onClick={() => this.setState({showAssociation: true, type: 'ASSOCIATE_WITH'})}
            />
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
          <Typography type='headline'>
            Associations à éviter
          </Typography>
          <Grid>
            <AddButton
              onClick={() => this.setState({showAssociation: true, type: 'DONT_ASSOCIATE_WITH'})}
            />
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

        <div className={classes.varieties}>
          <Typography type='headline'>
            Variétés
          </Typography>
          <Grid>
            <AddButton
              onClick={() => this.setState({showVariety: true})}
            />
            {
              this.state.flower.varieties
              .map((variety, index) => {
                return (
                  <FlowerGridItem
                    key={`variety-${index}`}
                    flower={variety}
                    onClick={() => history.push(`/flower/${this.props.flowerSlug}/${slugify(variety)}`)}
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

        <CreateVarietyDialog
          open={this.state.showVariety}
          onRequestClose={() => {
            this.setState({showVariety: false})
            this.fetchContent()
          }}
          flowerId={this.state.flower.id}
        />
      </Content>
    )
  }
}

export default withStyles(styles)(Layout)
