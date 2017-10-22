import React from 'react'
import Formsy from 'formsy-react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'

import * as VegetableCategory from '../../resources/VegetableCategory'
import * as Vegetable from '../../resources/Vegetable'

class NewVegetableForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      categories: [],
      categoryId: '',
      name: null,
      imageUrl: null,
      fetching: false,
      disabled: true
    }
  }

  componentDidMount () {
    VegetableCategory.find()
    .then((categories) => this.setState({categories}))
  }

  handleSubmit () {
    this.setState({disabled: true})
    Vegetable.create({
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      categoryId: this.state.categoryId
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
              <InputLabel htmlFor="category">Catégorie</InputLabel>
              <Select
                input={<Input id="category" />}
                value={this.state.categoryId}
                onChange={(event) => this.setState({categoryId: event.target.value})}
              >
                {
                  this.state.categories.map((category) => (
                    <MenuItem value={category.id} key={`cat-${category.id}`}>{category.name}</MenuItem>
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

export default NewVegetableForm
