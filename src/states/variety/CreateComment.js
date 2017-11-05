import React from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'

import * as Comment from '../../resources/Comment'

class NewFlowerForm extends React.Component {
  state = {
    error: null,
    owner: '',
    text: '',
    fetching: false,
    disabled: true
  }

  handleSubmit () {
    this.setState({disabled: true})
    Comment.create({
      owner: this.state.owner,
      text: this.state.text,
      varietyId: this.props.varietyId
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
        <DialogTitle>Ajouter un commentaire</DialogTitle>
        <DialogContent>
            <FormControl fullWidth>
              <TextField
                name='owner'
                label='Votre nom'
                required
                onChange={(event) => this.setState({owner: event.target.value})}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                name='text'
                label='Commetaire'
                required
                multiline
                rows="4"
                onChange={(event) => this.setState({text: event.target.value})}
              />
            </FormControl>

            <DialogActions>
              <Button
                raised
                color='primary'
                type='submit'
                onClick={() => this.handleSubmit()}
              >Ajouter</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}

export default NewFlowerForm
