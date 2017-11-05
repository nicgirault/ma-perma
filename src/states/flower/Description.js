import React from 'react'
import { withStyles } from 'material-ui/styles'
import CommonMark from 'commonmark'
import ReactRenderer from 'commonmark-react-renderer'

const styles = theme => ({
})

class Description extends React.Component {
  parser = new CommonMark.Parser()
  renderer = new ReactRenderer()

  render () {
    const {markdown} = this.props
    return (
      <div>
        {this.renderer.render(this.parser.parse(markdown))}
      </div>
    )
  }
}

export default withStyles(styles)(Description)
