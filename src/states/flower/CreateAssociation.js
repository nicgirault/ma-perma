import React from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Autocomplete from '../../layout/Autocomplete'

import * as Association from '../../resources/Association'
import * as Flower from '../../resources/Flower'

class NewFlowerAssociationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      suggestions: [],
      flowerId: null,
      fetching: false,
      disabled: true
    }
  }

  componentDidMount () {
    Flower.get()
    .then((flowers) => {
      const associatedFlowers = this.props.flower.relations
      .reduce((acc, relation) => {
        return [...acc, relation.flowerAId, relation.flowerBId]
      }, [])
      const suggestions = flowers
        .filter((flower) => associatedFlowers.indexOf(flower.id) === -1)
        .map((flower) => ({label: flower.name, id: flower.id}))
      this.setState({suggestions})
    })
  }

  handleSubmit () {
    this.setState({disabled: true})
    Association.create(
      this.props.flower.id,
      this.state.flowerId,
      this.props.type
    )
    .then(() => {
      this.props.onRequestClose()
      this.setState({error: null, disabled: false })
    })
    .catch((error) => {
      this.setState({
        error: error.response.data.code,
        disabled: false
      })
    })
  }

  render () {
    const {type, flowerId, ...dialogProps} = this.props
    return (
      <Dialog
        {...dialogProps}
      >
        <DialogTitle>Ajouter une Association</DialogTitle>
        <DialogContent>
          <Autocomplete
            placeholder='Chercher une plante'
            onSuggestionSelected={(event, {suggestion}) => {
              this.setState({flowerId: suggestion.id})
            }}
            suggestions={this.state.suggestions}
          />
          <DialogActions>
            <Button
              raised
              color='primary'
              type='submit'
              disabled={this.state.flowerId === null}
              onClick={() => this.handleSubmit()}
            >Ajouter</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}

export default NewFlowerAssociationForm
