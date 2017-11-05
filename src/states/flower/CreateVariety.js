import React from 'react'
import Formsy from 'formsy-react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import { typeLabels } from '../../services/Flower'

import * as Variety from '../../resources/Variety'

class NewFlowerForm extends React.Component {
  state = {
    error: null,
    types: Object.keys(typeLabels).map((value) => ({value, label: typeLabels[value]})),
    type: null,
    name: null,
    imageUrl: null,
    fetching: false,
    disabled: true
  }

  handleSubmit () {
    this.setState({disabled: true})
    Variety.create({
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      flowerId: this.props.flowerId
    })
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
    return (
      <Dialog
        {...this.props}
      >
        <DialogTitle>Ajouter une variété</DialogTitle>
        <DialogContent>
          <Formsy.Form
            onSubmit={() => this.handleSubmit()}
          >
            <FormControl fullWidth>
              <TextField
                name='name'
                label='Nom'
                required
                onChange={(event) => this.setState({name: event.target.value})}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                name='imageUrl'
                label='Image (url)'
                required
                onChange={(event) => this.setState({imageUrl: event.target.value})}
              />
            </FormControl>

            <DialogActions>
              <Button
                raised
                color='primary'
                type='submit'
              >Ajouter</Button>
            </DialogActions>
          </Formsy.Form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default NewFlowerForm
