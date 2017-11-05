import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '18px',
    marginLeft: '15px',
    marginRight: '15px',
  },
  group: {
    marginBottom: '10px',
  },
  propertyName: {
    color: '#777'
  },
  propertyValue: {
    color: '#000',
    fontWeight: 'bold'
  },
})

class Properties extends React.Component {
  render () {
    const {properties, classes} = this.props

    const descriptionProperties = properties
    .filter(flowerProperty => flowerProperty.property.type === 'DESCRIPTION')

    const environmentProperties = properties
    .filter(flowerProperty => flowerProperty.property.type === 'ENVIRONMENT')

    const usageProperties = properties
    .filter(flowerProperty => flowerProperty.property.type === 'USAGE')

    return (
      <div
        className={classes.root}
      >
        <div
          className={classes.group}
        >
          {
            descriptionProperties.map((property, index) => (
              <div
                key={`property-${index}`}

              >
                <span className={classes.propertyName}>{property.property.name}: </span>
                <span className={classes.propertyValue}>{property.value}</span>
              </div>
            ))
          }
        </div>
        <div
          className={classes.group}
        >
          {
            environmentProperties.map((property, index) => (
              <div
                key={`property-${index}`}

              >
                <span className={classes.propertyName}>{property.property.name}: </span>
                <span className={classes.propertyValue}>{property.value}</span>
              </div>
            ))
          }
        </div>
        <div
          className={classes.group}
        >
          {
            usageProperties.map((property, index) => (
              <div
                key={`property-${index}`}

              >
                <span className={classes.propertyName}>{property.property.name}: </span>
                <span className={classes.propertyValue}>{property.value}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Properties)
