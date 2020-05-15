import React from 'react'
import ReactDOM from 'react-dom'
import uuidv1 from 'uuid/v1'

// Components

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preguntas: {},
      modalOpen: false,
      openPanel: {}
    }
    this.showPanelForm = this.showPanelForm.bind(this)
    this.saveQuestions = this.saveQuestions.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  componentDidMount () {
    const {preguntas} = window.localStorage

    if (preguntas) {
      const indice = (Object.values(JSON.parse(preguntas)).length)
      this.setState({
        preguntas: JSON.parse(preguntas),
        openPanel: {
          [indice]: true
        }
      })
      this.scrollBottom()
    } else {
      const preguntas = {}
      const uuid = uuidv1()
      preguntas[uuid] = {type: '', pregunta: ''}
      this.setState({
        preguntas,
        openPanel: {}
      })
    }
  }

  componentDidUpdate () {
    setTimeout(this.scrollBottom(), 1500)
  }

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

  showPanelForm () {
    const {preguntas} = this.state
    const keysTypes = Object.keys(preguntas)

    const indice = parseInt((keysTypes.slice(-1)[0].slice(1)), 10)
    console.log(indice)
    const uuid = uuidv1()
    preguntas[uuid] = {type: '', pregunta: ''}
    this.setState({
      preguntas,
      openPanel: {
        [keysTypes.length]: true
      }
    })
    window.localStorage.setItem('preguntas', JSON.stringify(preguntas))
  }

  saveQuestions (id, name, value, respuestas) {
    const {preguntas, openPanel} = this.state
    preguntas[id][name] = value
    preguntas[id]['respuestas'] = respuestas
    openPanel[id] = (openPanel.hasOwnProperty(id)) ? false : openPanel[id]

    this.setState({
      preguntas,
      openPanel
    })
    window.localStorage.setItem('preguntas', JSON.stringify(preguntas))
  }

  onOpenModal () {
    this.setState({ modalOpen: true })
  }

  onCloseModal () {
    this.setState({ modalOpen: false })
  }

  deleteQuestion (id) {
    this.onCloseModal()
    const {preguntas, openPanel} = this.state
    if (Object.keys(preguntas).length > 1) {
      const indice = Object.keys(openPanel)[0]
      const cards = document.querySelectorAll('.type-card')
      const currentCard = cards[indice]
      currentCard.classList.add('deleted', 'animated', 'fadeOutUp', 'delay-1s', 'fast')
      setTimeout(
        () => {
          delete preguntas[id]
          window.localStorage.setItem('preguntas', JSON.stringify(preguntas))
          this.componentDidMount()
        }, 2000
      )
    } else {
      window.localStorage.removeItem('preguntas')
      this.componentDidMount()
    }
  }

  handleShow (id) {
    const {openPanel} = this.state
    this.setState({
      openPanel: {
        [id]: !openPanel[id]
      }
    })
  }

  render () {
    const {preguntas, modalOpen, openPanel} = this.state
    return (
      <div className='questionnaire-container'>
        <h2>Preguntas</h2>
        <div className='content'>
          {
            Object.keys(preguntas).map((key, i) => {
              const item = preguntas[key]

              // return <PanelsQuestions
              //   onCloseModal={this.onCloseModal}
              //   deleteItem={this.deleteQuestion}
              //   key={key}
              //   id={key}
              //   onOpenModal={this.onOpenModal}
              //   saveQuestions={this.saveQuestions}
              //   modalOpen={modalOpen}
              //   questions={item}
              //   handleShow={this.handleShow}
              //   isOpen={openPanel[key]}
              // />
              return true
            })
          }
          <i className='fas fa-plus-circle' onClick={this.showPanelForm} />
        </div>
      </div>
    )
  }
}

export default Index
