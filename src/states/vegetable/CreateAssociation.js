import React from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Autocomplete from '../../layout/Autocomplete'

import * as Association from '../../resources/Association'
import * as Vegetable from '../../resources/Vegetable'

class NewVegetableAssociationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      suggestions: [],
      vegetableId: null,
      fetching: false,
      disabled: true
    }
  }

  componentDidMount () {
    Vegetable.get()
    .then((vegetables) => {
      const suggestions = vegetables
        .filter((vegetable) => {
          if (vegetable.id === this.props.vegetable.id) return false
          if (this.props.vegetable.positiveAssociations.indexOf(vegetable.id) > -1) return false
          if (this.props.vegetable.negativeAssociations.indexOf(vegetable.id) > -1) return false
          return true
        })
        .map((vegetable) => ({label: vegetable.name, id: vegetable.id}))
      this.setState({suggestions})
    })
  }

  handleSubmit () {
    this.setState({disabled: true})
    Association.create(
      this.props.vegetable.id,
      this.state.vegetableId,
      this.props.isPositive
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
    const {isPositive, vegetableId, ...dialogProps} = this.props
    return (
      <Dialog
        {...dialogProps}
      >
        <DialogTitle>Ajouter une Association</DialogTitle>
        <DialogContent>
          <Autocomplete
            placeholder='Chercher une plante'
            onSuggestionSelected={(event, {suggestion}) => {
              this.setState({vegetableId: suggestion.id})
            }}
            suggestions={this.state.suggestions}
          />
          <DialogActions>
            <Button
              raised
              color='primary'
              type='submit'
              disabled={this.state.vegetableId === null}
              onClick={() => this.handleSubmit()}
            >Ajouter</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}

export default NewVegetableAssociationForm
