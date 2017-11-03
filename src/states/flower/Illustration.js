import React from 'react'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/ModeEdit'
import CancelIcon from 'material-ui-icons/Cancel'
import SaveIcon from 'material-ui-icons/CheckCircle'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  editZone: {
    position: 'absolute',
    top: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 5,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
  },
  iconButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 5,
    right: 5
  },
  textField: {
    position: 'absolute',
    top: 0,
    left: 5,
  }
})

class Illustration extends React.Component {
  state = {
    editing: false,
    showEdit: false,
    editedSrc: ''
  }
  componentDidMount () {
    this.setState({editedSrc: this.props.src})
  }
  handleSave () {
    this.props.handleUpdate(this.state.editedSrc)
    this.setState({editing: false})
  }
  render () {
    const {src, width, height, classes} = this.props
    return (
      <div
        className={classes.root}
        style={{width: width || 300, height: height || 300}}
        onMouseEnter={() => this.setState({showEdit: true})}
        onMouseLeave={() => this.setState({showEdit: false})}
      >
        <img
          src={src} alt='flower'
          className={classes.image}
        />
        <div
          className={classes.editZone}
          style={{
            opacity: this.state.showEdit ? 1 : 0,
            width: this.state.editing ? '100%' : '40px'
          }}
        >
          <TextField
          className={classes.textField}
            style={{
              display: this.state.editing ? 'block' : 'none'
            }}
            value={this.state.editedSrc}
            onChange={(event) => this.setState({editedSrc: event.target.value})}
          />
          <IconButton
            aria-label="Edit image"
            color="primary"
            onClick={() => this.setState({editing: true})}
            className={classes.iconButton}
            style={{
              display: this.state.editing ? 'none' : 'inline-block'
            }}
          >
            <EditIcon
              style={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <IconButton
            aria-label="save edit image"
            color="primary"
            className={classes.iconButton}
            style={{
              display: this.state.editing ? 'inline-block' : 'none',
              right: 35
            }}
            onClick={() => this.handleSave()}
          >
            <SaveIcon
              style={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <IconButton
            aria-label="cancel edit image"
            color="primary"
            onClick={() => this.setState({editing: false, editedSrc: this.props.src})}
            className={classes.iconButton}
            style={{
              display: this.state.editing ? 'inline-block' : 'none'
            }}
          >
            <CancelIcon
              style={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Illustration)
