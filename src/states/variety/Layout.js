import React from 'react'
import { withStyles } from 'material-ui/styles'

import * as Flower from '../../resources/Flower'
import * as Variety from '../../resources/Variety'
import Breadcrumb from '../../layout/Breadcrumb'
import { Content } from '../../layout/ContentElements'
import Typography from 'material-ui/Typography'
import { getIdFromSlug } from '../../services/Flower'
import { slugify } from '../../services/Flower'
import Illustration from './Illustration'
import CreateDealerDialog from './CreateDealer'
import CreateCommentDialog from './CreateComment'
import Comment from './Comment'
import IconButton from 'material-ui/IconButton'		
import AddIcon from 'material-ui-icons/AddCircleOutline'

const styles = {
  illustration: {
    marginTop: 20
  },
  dealers: {
    marginTop: '48px'
  },
  dealersHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  comments: {
    marginTop: '48px'
  },
  commentsHeader: {
    display: 'flex',
    alignItems: 'center'
  },
}

class Layout extends React.Component {
  state = {
    flower: null,
    variety: null,
    showAssociation: false,
    showVariety: false,
    type: null
  }
  componentDidMount () {
    this.fetchContent()
  }
  fetchContent () {
    const flowerId = getIdFromSlug(this.props.flowerSlug)
    const varietyId = getIdFromSlug(this.props.varietySlug)
    Promise.all([
      Flower.getById(flowerId),
      Variety.getById(varietyId)
    ]).then(([flower, variety]) => {
      this.setState({flower, variety})
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
            state: `/flower/${slugify(this.state.flower)}`,
            label: this.state.flower.name
          },
          {
            label: this.state.variety.name
          }
        ]} />
        <Typography type='title'>
          {this.state.variety.name}
        </Typography>
        <div className={classes.illustration}>
          <Illustration
            src={this.state.variety.imageUrl}
            handleUpdate={(newImageUrl) => this.updateImage(newImageUrl)}
          />
        </div>

        <div className={classes.dealers}>
          <div className={classes.dealersHeader}>
            <Typography type='headline'>
              Où acheter cette variété
            </Typography>
            <IconButton
              aria-label="Ajouter un point de vente"
              onClick={() => this.setState({showDealer: true})}
            >
              <AddIcon />
            </IconButton>
          </div>
          {
            this.state.variety.dealers
            .map((dealer, index) => {
              return (
                <div key={`dealer-${index}`}>
                  <a href={dealer.url} target='_blank'>{dealer.name}
                  </a>: <span>{dealer.price}</span>
                </div>
              )
            })
          }
        </div>

        <div className={classes.comments}>
          <div className={classes.commentsHeader}>
            <Typography type='headline'>
              Commentaires
            </Typography>
            <IconButton
              aria-label="Ajouter un point de vente"
              onClick={() => this.setState({showComment: true})}
            >
              <AddIcon />
            </IconButton>
          </div>
          {
            this.state.variety.comments
            .map((comment, index) => <Comment comment={comment} key={`comment-${index}`}/>)
          }
        </div>

        <CreateDealerDialog
          open={this.state.showDealer}
          onRequestClose={() => {
            this.setState({showDealer: false})
            this.fetchContent()
          }}
          varietyId={this.state.variety.id}
        />

        <CreateCommentDialog
          open={this.state.showComment}
          onRequestClose={() => {
            this.setState({showComment: false})
            this.fetchContent()
          }}
          varietyId={this.state.variety.id}
        />
      </Content>
    )
  }
}

export default withStyles(styles)(Layout)
