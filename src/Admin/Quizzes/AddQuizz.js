import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import Steps from './Components/Steps'
import FormGeneral from './Components/FormularioGeneral'
import FormTipos from './Components/FormularioTipos'
import FormPreguntas from './Components/FormularioPreguntas'
// import FormuFiltros from './Components/FormularioFiltros'
import axios from 'axios'

export default class AddQuizz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cuestionario: {
        description: '',
        logo: '',
        slug: '',
        title: '',
        style: ''
      }
    }

  }

  componentDidMount () {
    const {idsurvey} = this.props.match.params
    if(idsurvey !== 'nuevo') {
    const url = 'https://s3-us-west-2.amazonaws.com/adbuzz/' + idsurvey + '/data.json'
    const _this = this
    axios.get(url)
      .then( (response) => {
        console.log(response.data)
        const {description, logo, slug, title, style, preguntas, respuestas} = response.data
        const bodyJson = {
          description,
          logo,
          slug,
          title,
          style
        }
          console.log(respuestas)
        _this.setState({cuestionario: bodyJson, respuestas, preguntas}, 
          () => {
            window.localStorage.setItem("cuestionario", JSON.stringify(bodyJson))
            window.localStorage.setItem("preguntas", JSON.stringify(preguntas))
            window.localStorage.setItem("respuestas", JSON.stringify(respuestas))

          })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    
  }

  render() {
    const {cuestionario, preguntas, respuestas} = this.state
    return (<div className='add-item' >
    <Steps projectid={'match.params.projectid'}>
      <FormGeneral title='Datos generales'
        cuestionario={{...cuestionario}} />
      <FormTipos title='Resultados' respuestas={respuestas} />
      <FormPreguntas title='Preguntas' preguntas={{...preguntas}} />
      {/* <FormuFiltros title='Filtros' /> */}
    </Steps>
  </div>)
  }
}

