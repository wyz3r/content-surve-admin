import React from 'react'
import PropTypes from 'prop-types'
// Components
import {SimplePanel} from './../../../../Common'
import {Panel, PanelDetail} from './ContentPanelTipos'

class Accordion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openPanel: {}
    }
  }

  render () {
    const {respuestas, saveItem, deleteItem, closePreview, updateImage, deleteImage, handleShow, openPanel} = this.props
    const typesValues = Object.values(respuestas)
    const typesKeys = Object.keys(respuestas)
    return (
      typesValues.map((respuesta, i) => {
        return <SimplePanel
          handleShow={() => { handleShow(i) }}
          key={i}
          isOpn={!!openPanel[i]}
          panel={i}>
          <Panel
            saveItem={saveItem}
            name={respuesta.name}
            panel={typesKeys[i]} />
          <PanelDetail
            closePreview={closePreview}
            deleteItem={deleteItem}
            deleteImage={deleteImage}
            saveItem={saveItem}
            respuesta={respuesta}
            updateImage={updateImage}
            panel={typesKeys[i]}
          />
        </SimplePanel>
      })
    )
  }
}

Accordion.propTypes = {
  deleteImage: PropTypes.func,
  deleteItem: PropTypes.func,
  handleShow: PropTypes.func,
  openPanel: PropTypes.object,
  respuestas: PropTypes.objectOf(
    PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string
    })
  ),
  saveItem: PropTypes.func,
  updateImage: PropTypes.func
}

export default Accordion
