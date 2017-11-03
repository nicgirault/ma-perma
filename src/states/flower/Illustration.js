import React from 'react'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import Popover from 'material-ui/Popover'
import EditIcon from 'material-ui-icons/ModeEdit'


const styles = theme => ({
  root: {
    cursor: 'pointer',
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
    '&:hover img': {
      filter: 'grayscale(50%)',
    }
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: '.3s ease-in-out',
    filter: 'grayscale(0)',
  },
  overlay: {
    position: 'absolute',
    transition: '.3s ease-in-out',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    zIndex: 1,
    '&:hover': {
      opacity: 1,
    }
  }
})

class Illustration extends React.Component {
  state = {
    editing: false
  }
  render () {
    const {src, width, height, classes} = this.props
    return (
      <div className={classes.root} style={{width: width || 300, height: height || 300}}>
        <img
          src={src} alt='flower'
          className={classes.image}
          style={{width: width || 300, height: height || 300}}
        />
        <div
          className={classes.overlay}
          onClick={() => this.setState({editing: true})}
        >
          <EditIcon
            ref={(icon) => this.icon = icon}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </div>
        <Popover
          open={this.state.editing}
          anchorEl={findDOMNode(this.icon)}
          onRequestClose={() => this.setState({editing: false})}
        >toto
        </Popover>
      </div>
    )
  }
}

export default withStyles(styles)(Illustration)
