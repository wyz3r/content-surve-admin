import React from 'react'
import ReactDOM from 'react-dom'
// import uuidv1 from 'uuid/v1'
// Components forlmulario resultados 
import Accordion from './Components/Accordion'

const alphabetKeys = (elementNumber) => {
  const alphabet = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q','r','s','t','u','v','w','x','y','z']
  
  const letter  =  alphabet[ parseInt(elementNumber, 10)]
  return letter.toUpperCase()
}
// const validacionrecursiva  = (respuestas, panel) => {
//   const alphabet = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q','r','s','t','u','v','w','x','y','z']
//   var keys = Object.keys(respuestas)
//   var result = [];
//   console.log(keys)
//   keys.forEach((key, index) => {
//     console.log(index)
//     result.push(respuestas[key]);
// })
  // console.log(alphabet.filter(letter => panel === letter))
// }
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      respuestas: {},
      openPanel: {}
    }
    this.dataStorage = JSON.parse(window.localStorage.getItem('respuestas'))
    this.showFormRespuesta = this.showFormRespuesta.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.saveRespuesta = this.saveRespuesta.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    this.deleteRespuesta = this.deleteRespuesta.bind(this)
    // this.updateCurrentPanel = this.updateCurrentPanel.bind(this)
  }

  componentDidMount () {

    if (this.dataStorage) {

      this.setState({
        respuestas: this.dataStorage
      })
    } else {
      const respuestas = {}
      // const uuid = uuidv1()
      const idkey = alphabetKeys(0)
      respuestas[idkey] = { name: '', description: '', image: '', key: idkey }

      this.setState({
        respuestas,
        openPanel: { 0: true },
      })
    }
    this.scrollBottom()
  }

  componentDidUpdate () {
    setTimeout(this.scrollBottom(), 1500)
  }

  /* actualiza localStorage cada que se actualiza el estado */
  shouldComponentUpdate (nextProps, nextState) {
    window.localStorage.setItem('respuestas', JSON.stringify(nextState['respuestas']))
    return true
  }

  /* poner en pantalla el panel recien abierto */
  scrollBottom () {
    const {openPanel} = this.state
    const indice = Object.keys(openPanel)[0]
    const node = ReactDOM.findDOMNode(this)
    const cards = node.querySelectorAll('.type-card')
    const currentCard = cards[indice]
    if (currentCard) {
      currentCard.scrollIntoView({behavior: 'smooth'})
    }
  }

  /* Agregar nuevo formulario para nueva respuesta(final) */
  showFormRespuesta () {
    const {respuestas} = this.state
    // const uuid = uuidv1()
    const idkey = alphabetKeys(Object.keys(respuestas).length)
    
    // const indice = parseInt(Object.keys(respuestas).slice(-1)) + 1
    if (Object.keys(respuestas).length > 0) {
      respuestas[idkey] = { name: '', description: '', image: '', key: idkey }

      this.setState({
        respuestas,
        openPanel: {
          [Object.values(respuestas).length - 1]: true
        }
      })
    }
  }

  /* maneja que panel está abierto */
  handleShow (i) {
    const {openPanel} = this.state
    const isOpen = !openPanel[i]
    this.setState({
      openPanel: {
        [i]: !!isOpen
      }
    })
  }

  /* guardar las respuestas ingresadas */
  saveRespuesta (e, panel) {
    const {respuestas} = this.state
    const target = e.target
    const {value, name} = e.target
    respuestas[panel][name] = value
    if (name === 'key') {
      if (this.showWarning(value, target, panel)) {
        return null
      } else {
        this.setState({
          respuestas
        })
      }
    } else {
      this.setState({
        respuestas
      })
    }
  }

  /* muestra advertencia cuando la key está repetida */
  showWarning (key, elem, id) {
    if (this.validateKey(key, id)) {
      const parent = elem.parentNode.parentNode
      const errorLabel = parent.querySelector('.invalid-feedback')
      errorLabel.innerText = 'Clave utilizada, ingresa una diferente.'
      return true
    } else {
      const parent = elem.parentNode.parentNode
      const errorLabel = parent.querySelector('.invalid-feedback')
      if (errorLabel === null) {
        return null
      } else {
        errorLabel.innerText = ''
      }
      return false
    }
  }

  /* validar que la key ingresada no esté repetida */
  validateKey (key, id) {
    if (key === '' || (!window.localStorage.getItem('respuestas'))) {
      return false
    } else {
      const {respuestas} = window.localStorage
      const respuesta = JSON.parse(respuestas)
      const filtroKeys = Object.values(respuesta).filter(resp => {
        return resp.key === key && resp.id !== id
      })
      if (filtroKeys.length > 0) {
        return true
      } else {
        return false
      }
    }
  }

  /* actualizar imagen de la respuesta */
  updateImage (image, panel) {
    const {respuestas} = this.state
    respuestas[panel].image = image
    this.setState({
      respuestas
    })
  }

  /* eliminar imagen de la respuesta final */
  deleteImage (panel) {
    const {respuestas} = this.state
    respuestas[panel].image = ''
    this.setState({
      respuestas
    })
  }

  /* eliminar pregunta final */
  deleteRespuesta (panel) {
    const {respuestas, openPanel} = this.state
    const indice = Object.keys(openPanel)[0]
    

    if (Object.keys(respuestas).length > 1) {
      const cards = document.querySelectorAll('.type-card')
      const currentCard = cards[indice]
      currentCard.classList.add('deleted', 'animated', 'fadeOutUp', 'delay-1s', 'fast')
      setTimeout(
        () => {
          delete respuestas[panel]

          this.setState({
            respuestas
          })
          currentCard.classList.remove('deleted', 'animated', 'fadeOutUp', 'delay-1s', 'fast')
        }, 2000
      )
    } else {
      this.setState({
        respuestas: {0: { name: '', description: '', image: '', key: '' }}
      })
    }
  }

  render () {
    const {respuestas, openPanel} = this.state
    return (
      <div className='questionnaire-container'>
        <h2>Resultados</h2>
        <div className='content'>
          <Accordion
            handleShow={this.handleShow}
            openPanel={openPanel}
            closePreview={this.closePreview}
            deleteItem={this.deleteRespuesta}
            deleteImage={this.deleteImage}
            saveItem={this.saveRespuesta}
            respuestas={respuestas}
            updateImage={this.updateImage} />
          <i className='fas fa-plus-circle' onClick={this.showFormRespuesta} />
        </div>
      </div>
    )
  }
}

export default Index
