import React from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'

import * as Dealer from '../../resources/Dealer'

class NewDealerForm extends React.Component {
  state = {
    error: null,
    fetching: false,
    disabled: true,
    name: '',
    url: '',
    price: ''
  }

  handleSubmit () {
    this.setState({disabled: true})
    Dealer.create({
      name: this.state.name,
      url: this.state.url,
      price: this.state.price,
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
        <DialogTitle>Ajouter un point de vente</DialogTitle>
        <DialogContent>
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
              name='url'
              label='Lien (url)'
              required
              onChange={(event) => this.setState({url: event.target.value})}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='price'
              label='Prix'
              required
              placehold='3.95€ / 50 graines'
              onChange={(event) => this.setState({price: event.target.value})}
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

export default NewDealerForm
