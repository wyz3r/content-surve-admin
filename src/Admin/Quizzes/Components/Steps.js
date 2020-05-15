import React, { Component } from 'react'
import {GeneralButton} from './../../Common'
import axios from 'axios'
import {validate} from '../../helpers/validate'
import Modal from 'react-responsive-modal'

// import PropTypes from 'prop-types'

const domain = process.env.REACT_APP_URL

const Stepper = ({children, current, maxStep}) => (
  <ul className='step-indicators'>
    {buildStepper(children, current, maxStep)}
  </ul>
)

const buildStepper = (children, current, maxStep) => {
  return children.map((element, index) => {
    let type = (index <= maxStep) ? 'active' : ''
    type = (current === index) ? type + ' current' : type
    return (
      <StepperItem
        key={index}
        index={index}
        current={current}
        element={element}
        type={type} />
    )
  })
}

const StepperItem = ({index, current, element, type}) => (
  <li>
    <div className={type}>{index + 1}</div>
    <p className=''>{element.props.title}</p>
  </li>
)

const StepsFooter = ({validateForm, changeStep, createQuizz, currentStep, childrenLen, maxStep}) => (
  <div className='form-footer'>
    {(currentStep > 0) ? <GeneralButton content='Anterior' styles={{justifySelf: 'start'}} handleClick={() => { changeStep(false) }} /> : <div /> }
    {(currentStep < childrenLen - 1) ? <GeneralButton content='Siguiente' styles={{justifySelf: 'end'}} handleClick={() => { validateForm() }} /> : null }
    {(currentStep === maxStep) ?
    <GeneralButton content='Finalizar' styles={{justifySelf: 'end'}} handleClick={() => { validateForm() }} /> : <div /> }
  </div>
)

class Steps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 0,
      maxStep: 0,
      open: false,
      idSurvey: ''
    }
    this.dataQuizz = JSON.parse(window.localStorage.getItem('cuestionario'))
    this.dataResults = JSON.parse(window.localStorage.getItem('respuestas'))
    this.dataQuestions = JSON.parse(window.localStorage.getItem('preguntas'))
    this.changeStep = this.changeStep.bind(this)
    this.createJsonQuizz = this.createJsonQuizz.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount () {
    const maxStep = (parseInt(localStorage.getItem('maxStep'), 10)) || 0
    const currentStep = (parseInt(localStorage.getItem('currentStep'), 10)) || 0

    this.setState({maxStep, currentStep})

  }

  /* valida que se pueda pasar al siguiente paso */
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
  validateForm () {
    const {currentStep} = this.state
    const generalForm = document.querySelector('.questionnaire')
    const panelsForm = document.querySelectorAll('.type-card')
    if (currentStep === 0) {
      if (validate(generalForm)) this.changeStep(true)
    } if (currentStep === 1) {
      const arr = []
      panelsForm.forEach(element => {
        arr.push(validate(element))
      })
      if (arr.every((currentValue) => currentValue === true)) return this.changeStep(true)
    } if (currentStep === 2) {
      const arr = []
      panelsForm.forEach(element => {
        arr.push(validate(element))
      })
      if (arr.every((currentValue) => currentValue === true)) return this.createJsonQuizz()
    }
  }

  changeStep (direction) {
    let {currentStep, maxStep} = this.state
    let {children} = this.props

    if (direction && currentStep < children.length) {
      currentStep++
    } else if (currentStep > 0) { currentStep-- }

    maxStep = (currentStep > maxStep) ? currentStep : maxStep
    localStorage.setItem('maxStep', maxStep)
    localStorage.setItem('currentStep', currentStep)
    this.setState({currentStep, maxStep})
  }

  /* manda la info al backend */
  createJsonQuizz () {
    // const {projectid} = this.props
    const {cuestionario,
      preguntas,
      respuestas} = window.localStorage

    const resultados = {}
    const results = JSON.parse(respuestas)
    for (let key in results) {
      resultados[results[key].key] = {
        'name': results[key].name,
        'description': results[key].description,
        'image': results[key].image,
        'key': results[key].key
      }
    }
    const payload = {
      cuestionario: JSON.parse(cuestionario),
      preguntas: JSON.parse(preguntas),
      respuestas: resultados,
      // projectid
    }
    console.log(payload.cuestionario.slug)

    axios.post(`${domain}/uploadfIle`, payload)
      .then(response => {
        if (response.data === 'duplicado') {
          console.log('Oops')
        }
        console.log(response.status)
        if (response.status) {
          this.setState({open: true, idSurvey: payload.cuestionario.slug})
          
        }

        // console.log('mandar a proyectos')
        // window.localStorage.removeItem('cuestionario')
        // window.localStorage.removeItem('preguntas')
        // window.localStorage.removeItem('respuestas')
        // window.localStorage.setItem('currentStep', '0')
        // window.location.href = '/admin/quizzes/final'
        // window.location.href = `/admin/proyecto/${projectid}`
      }).catch(error => {
        console.log(error)
      })
  }
  openSurvey (url , idSurvey) {
    window.open(url + idSurvey, '_blank');
  }
  render () {
    const {currentStep, maxStep, open, idSurvey} = this.state
    let {children} = this.props
    return (
      <div className='form-admin'>
        <div >
          <Stepper children={children} current={currentStep} maxStep={maxStep} />
          {children[currentStep]}
        </div>
        <StepsFooter
          validateForm={this.validateForm}
          changeStep={this.changeStep}
          createQuizz={this.createJsonQuizz}
          childrenLen={children.length}
          currentStep={currentStep}
          maxStep={maxStep} />
        <Modal
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          // showCloseIcon={false}
          // onClose={() => {}}
          open={open} onClose={this.onCloseModal} center
          >
          <h2>Revisar las comunidades</h2>
          <div>ID: {idSurvey}</div>

          <div className='formModald'>
            <GeneralButton content={'Memexicolindo'}
              styles={{justifySelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px' }}
              handleClick={() => { this.openSurvey('http://quizz.memexicolindo.com/',idSurvey ) }} />
            <GeneralButton content={'Mancave'}
              styles={{justifySelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}
              handleClick={() => { this.openSurvey('http://quizz.mancavemx.com/',idSurvey )  }} />
            <GeneralButton content={'selfthinkers'}
              styles={{justifySelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}
              handleClick={() => { this.openSurvey('http://quizz.selfthinkers.net/',idSurvey ) }} /> 
            <GeneralButton content={'mdmexico'}
              styles={{justifySelf: 'center', width: '100%', marginTop: '5px', marginBottom: '5px'}}
              handleClick={() => { this.openSurvey('http://quizz.mujerdemexico.com/',idSurvey ) }} /> 
          </div>
          <div className='caja-modal' >
            <GeneralButton content={'Crear otro id '} styles={{justifySelf: 'center', width: '150px', marginTop: '5px', marginBottom: '5px' }}
              handleClick={() => { 
                this.setState({currentStep: 0, open: false}, () => localStorage.setItem('currentStep', 0))
              
              }} />
            <GeneralButton content={'finalizar'} styles={{justifySelf: 'center', width: '150px', marginTop: '5px', marginBottom: '5px'}} handleClick={() => { window.location.href = '/admin/proyectos'  }} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Steps

// AddItems.propTypes = {
//   onClick: PropTypes.func.isRequired
// }
