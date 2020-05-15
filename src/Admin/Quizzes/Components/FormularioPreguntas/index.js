import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// Components forlmulario preguntas 
import Accordion from './Components/Accordion'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preguntas: [],
      openPanel: {}
    }
    this.dataStorage = JSON.parse(window.localStorage.getItem('preguntas'))
    this.dataRespuestas = JSON.parse(window.localStorage.getItem('respuestas'))
    this.showFormQuestion = this.showFormQuestion.bind(this)
    this.showFormAnswer = this.showFormAnswer.bind(this)
    this.saveQuestions = this.saveQuestions.bind(this)
    this.saveRespuestas = this.saveRespuestas.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.deleteAnswer = this.deleteAnswer.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  componentDidMount () {
    if (this.dataStorage) {
      this.setState({
        preguntas: this.dataStorage
      })
      this.scrollBottom()
    } else {
      this.setState({
        preguntas: [{type: '', pregunta: '', respuestas: this.createRespuestas()}],
        openPanel: {0: true}
      })
    }
  }

  componentDidUpdate () {
    setTimeout(this.scrollBottom(), 1500)
  }

  /* actualiza localStorage cada que se actualiza el estado */
  shouldComponentUpdate (nextProps, nextState) {
    window.localStorage.setItem('preguntas', JSON.stringify(nextState['preguntas']))
    return true
  }

  /* muestra en pantalla el panel recién abierto */
  scrollBottom () {
    const {openPanel} = this.state
    const indice = Object.keys(openPanel)[0]
    const node = ReactDOM.findDOMNode(this)
    const cards = node.querySelectorAll('.type-card')
    const currentCard = cards[indice]
    if (currentCard) {
      currentCard.scrollIntoView(true, {behavior: 'smooth'})
    }
  }

  /* Crear las keys para las respuestas a la pregunta basados en los resultados */
  createRespuestas () {
    if (this.dataRespuestas) {
      const arr = Object.values(this.dataRespuestas)
      const lista = arr.map((value) => {
        return ({
          'text': '',
          'image': '',
          'key': value.key
        })
      })
      return lista
    } return []
  }

  /* muestra el formulario para ingresar una nueva pregunta */
  showFormQuestion () {
    const {preguntas} = this.state
    const preguntaNueva = {type: '', pregunta: '', respuestas: this.createRespuestas()}
    this.setState({
      preguntas: [...preguntas, preguntaNueva],
      openPanel: {
        [preguntas.length]: true
      }
    })
  }

  /* muestra un input más para ingresar respuestas a una pregunta */
  showFormAnswer () {
    const {preguntas, openPanel} = this.state
    const currentPreg = Object.keys(openPanel)[0]
    const respuestas = preguntas[currentPreg]['respuestas']
    const respuestaNueva = {text: '', image: '', key: ''}
    const actualizada = [...respuestas, respuestaNueva]
    preguntas[currentPreg]['respuestas'] = actualizada
    this.setState({
      preguntas
    })
  }

  /* guarda la pregunta ingresada */
  saveQuestions (e, panel) {
    const {preguntas} = this.state
    const {name, value} = e.target
    preguntas[panel][name] = value
    this.setState({
      preguntas
    })
  }

  /* guarda las respuestas en la pregunta correspondiente */
  saveRespuestas (e, iresp) {
    const {preguntas, openPanel} = this.state
    const currentPreg = Object.keys(openPanel)[0]
    const {name, value} = e.target
    const respuestas = preguntas[currentPreg].respuestas
    respuestas[iresp][name] = value
    this.setState({
      preguntas
    })
  }

  /* actualizar imagen de la respuesta */
  updateImage (image, iresp) {
    const {preguntas, openPanel} = this.state
    const currentPreg = Object.keys(openPanel)[0]
    const respuestas = preguntas[currentPreg].respuestas
    respuestas[iresp]['image'] = image
    this.setState({
      preguntas
    })
  }

  /* eliminar imagen de la respuesta */
  deleteImage (iresp) {
    const {preguntas, openPanel} = this.state
    const currentPreg = Object.keys(openPanel)[0]
    const respuestas = preguntas[currentPreg].respuestas
    respuestas[iresp]['image'] = ''
    this.setState({
      preguntas
    })
  }

  /* eliminar pregunta */
  deleteQuestion () {
    const {preguntas, openPanel} = this.state
    if (preguntas.length > 1) {
      const indice = Object.keys(openPanel)[0]
      const cards = document.querySelectorAll('.type-card')
      const currentCard = cards[indice]
      currentCard.classList.add('deleted', 'animated', 'fadeOutUp', 'delay-1s', 'fast')
      setTimeout(
        () => {
          preguntas.splice(indice, 1)
          this.setState({
            preguntas
          })
          currentCard.classList.remove('deleted', 'animated', 'fadeOutUp', 'delay-1s', 'fast')
        }, 2000
      )
    } else {
      this.setState({
        preguntas: [{type: '', pregunta: '', respuestas: this.createRespuestas()}]
      })
    }
  }

  /* elimina una respuesta de una pregunta */
  deleteAnswer (iresp) {
    const {preguntas, openPanel} = this.state
    const currentPreg = Object.keys(openPanel)[0]
    const respuestas = preguntas[currentPreg]['respuestas']
    if (respuestas.length > 1) {
      respuestas.splice(iresp, 1)
      this.setState({
        preguntas
      })
    } else {
      preguntas[currentPreg]['respuestas'] = [{text: '', image: '', key: ''}]
      this.setState({
        preguntas
      })
    }
  }

  /* Maneja que panel está abierto */
  handleShow (id) {
    const {openPanel} = this.state
    this.setState({
      openPanel: {
        [id]: !openPanel[id]
      }
    })
  }

  render () {
    const {preguntas, openPanel} = this.state
    return (
      <div className='questionnaire-container'>
        <h2>{this.props.title}</h2>
        <div className='content'>
          <Accordion
            handleShow={this.handleShow}
            openPanel={openPanel}
            closePreview={this.closePreview}
            deleteItem={this.deleteQuestion}
            deleteImage={this.deleteImage}
            deleteAnswer={this.deleteAnswer}
            updateImage={this.updateImage}
            saveItem={this.saveQuestions}
            saveRespuesta={this.saveRespuestas}
            preguntas={preguntas}
            showFormAnswer={this.showFormAnswer} />
          <i className='fas fa-plus-circle' onClick={this.showFormQuestion} />
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  title: PropTypes.string.isRequired
}

export default Index
