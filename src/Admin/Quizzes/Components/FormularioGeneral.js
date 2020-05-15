import React from 'react'
import PropTypes from 'prop-types'

// Components formulario general 
import UploadFile from '../../Common/Media'
import {stringSlug} from '../../helpers/stringUtils'

class FormGeneral extends React.Component {
  constructor (props) {
    super(props)
  
    this.state = {
      title: '',
      logo: '',
      description: '',
      style: null,
      slug: ''
    }

    this.dataStorage = JSON.parse(window.localStorage.getItem('cuestionario'))
    this.handleChange = this.handleChange.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.handlerUrlImage = this.handlerUrlImage.bind(this)
    this.closePreview = this.closePreview.bind(this)
    this.handleChagetitle = this.handleChagetitle.bind(this)
    this.handleChageIdentificador = this.handleChageIdentificador.bind(this)

  }

  componentDidMount () {
    if (this.dataStorage) {
      this.setState(this.dataStorage)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    
    // window.localStorage.setItem('cuestionario', JSON.stringify(nextState))
    return true
  }

  componentWillReceiveProps(nextProps ) {
    const { cuestionario} = nextProps
    if (cuestionario !== '') {
          this.setState({...cuestionario})
    } 
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    }, () => this.refereshlocalstorage() )
  }

  refereshlocalstorage() {
    window.localStorage.setItem('cuestionario', JSON.stringify(this.state)) 
  }

  handleChagetitle (e) {
    const slug = stringSlug(e.target.value)
    this.setState({title: e.target.value , slug}, () => {
      this.refereshlocalstorage()
    })
  }

  handleChageIdentificador (e) {
    const {title} = this.state
    const identi =  e.target.value !== '' ? '-' + e.target.value : e.target.value
    const slug = stringSlug(title)

    this.setState({identificador: e.target.value , slug: slug + identi}, () => {
      this.refereshlocalstorage()
    })
  }

  handleMouseLeave (e) {
    console.log(e)
    // llamar al endpoint para verificar el slug (id)
  }
  // refactorizar para que solo sea una sola funcion
  handlerUrlImage (e) {
    // const url = e.target.value
    this.setState({
      'logo': e.target.value
    }, () => {
      this.refereshlocalstorage()
    })
  }

  handleImage (image) {
    this.setState({
      logo: image
    }, () => {
      this.refereshlocalstorage()
    } )
  }

  closePreview (e) {
    this.setState({logo: ''}, () => this.refereshlocalstorage())
  }

  render () {
    const {title, slug} = this.props
    return (
      <div className='questionnaire-container'>
        <h2 className='step-title'>{title}</h2>
        <form className='content questionnaire'>
          <div className='first-col'>
            <GeneralInput 
              text='Título'
              name='title'
              handleChange={(e) => this.handleChagetitle(e)}
              placeholder='Nombre visible para tu audiencia'
              value={this.state.title}
              type='text'
              handleMouseLeave={this.handleMouseLeave} />

            <label htmlFor='style'>Tipo de cuestionario:</label>
            <select
              name='style'
              onChange={e => this.setState({ style: e.target.value || null }, () => this.refereshlocalstorage() )}
              value={this.state.style || ''}
              required >
              <option value='' />
              <option value='buzz'>Buzz</option>
              <option value='slider'>Slider</option>
            </select>
            <div className='invalid-feedback' />
            <GeneralInput 
              text='identificador' name='identificador'
              handleChange={(e) => this.handleChageIdentificador(e)}
              placeholder='identificador'
              value={this.state.identificador}
              type='text'
              requerido={false}
            />
            <GeneralInput 
              text='Slug' name='slug'
              handleChange={() => this.handleChagetitle}
              placeholder='slug'
              value={this.state.slug}
              type='text'
              readonly />

            
          </div>

          <div className='second-col'>
            <label htmlFor='description'>Descripción:</label>
            <textarea className='form-control'
              maxLength='600'
              name='description'
              onChange={ (e) => this.handleChange(e)}
              placeholder='¿De que se trata?'
              // required
              rows='4'
              value={this.state.description}
            />
            <div className='invalid-feedback' />
            
            {this.state.slug !== '' ? <UploadFile
              closePreview={this.closePreview}
              handleChange={ (e) => this.handlerUrlImage(e)}
              src={this.state.logo}
              text='Url de la portada'
              handleImage={(e) => this.handleImage(e)}
              reference='stepUno'
              requerido={false}
             />: ''}
              
            <div className='invalid-feedback' />
          </div>
        </form>
      </div>
    )
  }
}

const GeneralInput = ({value, placeholder, name, text, handleChange, type, handleMouseLeave, readonly, requerido = true}) => (
  <React.Fragment >
    <label htmlFor={name}>{text}:</label>
    <input className='form-control'
      maxLength='70'
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      type={type}
      onMouseLeave={handleMouseLeave}
      readOnly={readonly}
      required={requerido} />
    <div className='invalid-feedback' />
  </React.Fragment>
)

FormGeneral.propTypes = {
  next: PropTypes.func
}

export default FormGeneral
