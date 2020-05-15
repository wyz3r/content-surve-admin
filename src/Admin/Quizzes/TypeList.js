import React from 'react'
import PropTypes from 'prop-types'

// Components
import {SimplePanel, EmptyMessage} from './../Common'

class TypeList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openPanel: {}
    }
    this.handleShow = this.handleShow.bind(this)
  }

  handleShow (i) {
    const {openPanel} = this.state
    const isOpen = !openPanel[i]
    this.setState({
      openPanel: {
        [i]: !!isOpen
      }
    })
  }

  render () {
    const {openPanel} = this.state
    const {respuestas} = this.props
    if (respuestas) {
      return (
        Object.values(respuestas).map((resp, i) => {
          const {name, description} = resp
          return <SimplePanel handleShow={this.handleShow}
            isOpn={!!openPanel[i]}
            key={i}
            panel={i}>
            <div>{ `${name} (Mayoría de ${Object.keys(respuestas)[i]})`}</div>
            <div>
              <p>{description}</p>
            </div>
          </SimplePanel>
        })
      )
    } return <EmptyMessage size={'1.2rem'} />
  }
}

export default TypeList

TypeList.propTypes = {
  // respuestas: PropTypes.objectOf(PropTypes.object)
}
