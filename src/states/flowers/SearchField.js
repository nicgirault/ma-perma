import React from 'react'
import Input, { InputAdornment } from 'material-ui/Input'
import SearchIcon from 'material-ui-icons/Search'

class SearchField extends React.Component {
  render () {
    return (
    <Input
      value={this.props.value}
      fullWidth
      placeholder='Rechercher...'
      onChange={(event) => this.props.onChange(event)}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
    )
  }
}

export default SearchField
