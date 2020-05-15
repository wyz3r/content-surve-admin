import React from 'react'
import PropTypes from 'prop-types'

import AcordeonItem from './AcordeonItem'

class Acordeon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      AcordeonItems: {}
    }

    this.toggleItem = this.toggleItem.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.children !== this.props.children) {
      const AcordeonItems = this.generateElements(nextProps.children)
      this.setState({AcordeonItems})
    }
    return true
  }

  toggleItem (id) {
    const {AcordeonItems} = this.state
    AcordeonItems[id]['isOpen'] = !AcordeonItems[id]['isOpen']
    this.setState({AcordeonItems})
  }

  generateElements (children) {
    const AcordeonItems = {}
    children.forEach(element => {
      const {id, isOpen} = element.props
      AcordeonItems[id] = {isOpen, element}
    })
    return AcordeonItems
  }

  render () {
    const {placeholder} = this.props
    const {AcordeonItems} = this.state
    return (
      Object.keys(AcordeonItems).map((id, index) => {
        const {isOpen, element} = AcordeonItems[id]

        return (
          <AcordeonItem key={id} placeholder={placeholder} id={id} isOpen={isOpen} toggleItem={this.toggleItem}>
            {element}
          </AcordeonItem>
        )
      })
    )
  }
}

Acordeon.propTypes = {
  placeholder: PropTypes.string
}

export default Acordeon
