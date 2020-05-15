import React from 'react'
import PropTypes from 'prop-types'
// Components
import {SimplePanel} from './../../../../Common'
import {Panel, PanelDetail} from './ContentPanelPreguntas'

class Accordion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openPanel: {}
    }
  }

  render () {
    const {deleteItem, handleShow, openPanel, preguntas, saveItem, saveRespuesta, closePreview, deleteImage, updateImage, showFormAnswer, deleteAnswer} = this.props
    return (
      preguntas.map((pregunta, i) => {
        return <SimplePanel
          handleShow={() => { handleShow(i) }}
          key={i}
          isOpn={!!openPanel[i]}
          panel={i}>
          <Panel
            saveItem={saveItem}
            name={pregunta.pregunta}
            panel={i} />
          <PanelDetail
            closePreview={closePreview}
            deleteItem={deleteItem}
            deleteImage={deleteImage}
            updateImage={updateImage}
            saveItem={saveItem}
            saveRespuesta={saveRespuesta}
            pregunta={pregunta}
            showFormAnswer={showFormAnswer}
            deleteAnswer={deleteAnswer}
            panel={i} />
        </SimplePanel>
      })
    )
  }
}

Accordion.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  openPanel: PropTypes.object.isRequired,
  preguntas: PropTypes.arrayOf(
    PropTypes.shape({
      pregunta: PropTypes.string,
      respuestas: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string,
          key: PropTypes.string,
          text: PropTypes.string
        })
      ),
      type: PropTypes.string
    })
  ).isRequired,
  saveItem: PropTypes.func.isRequired,
  saveRespuesta: PropTypes.func.isRequired,
  showFormAnswer: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired
}

export default Accordion
