import React from 'react'
import Formsy from 'formsy-react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import { typeLabels } from '../../services/Flower'

import * as Flower from '../../resources/Flower'

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
    Flower.create({
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      type: this.state.type
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
        <DialogTitle>Ajouter une plante</DialogTitle>
        <DialogContent>
          <Formsy.Form
            onSubmit={() => this.handleSubmit()}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                input={<Input id="type" />}
                value={this.state.type}
                onChange={(event) => this.setState({type: event.target.value})}
              >
                {
                  this.state.types.map((type) => (
                    <MenuItem value={type.value} key={`cat-${type.value}`}>{type.label}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

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
