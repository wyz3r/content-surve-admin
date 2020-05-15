import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import muestra from './../muestra.json'
import {GeneralButton, SimpleCard, FilterCard, BackButton, EmptyMessage, ErrorRequest} from './../Common'
import TypeList from './TypeList'

const domain = process.env.REACT_APP_URL

const QuestionsList = ({preguntas}) => {
  if (preguntas) {
    return (
      <ul className='questions-list'>
        {
          preguntas.map((pregunta, i) => {
            return <li key={i}>{pregunta.pregunta}</li>
          })
        }
      </ul>
    )
  } return <EmptyMessage size={'1.2rem'} />
}

const FilterList = ({filtros}) => {
  if (filtros) {
    return Object.values(filtros).map(filtro => {
      const {name, url, valores} = filtro
      return <FilterCard
        key={name}
        handleClick={this.downloadIndividual}
        name={name}
        url={url}
        valores={valores} />
    })
  } return <EmptyMessage size={'1.7rem'} />
}

class QuizzDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quizz: {},
      openPanel: {},
      error: ''
    }
    this.downloadAcumulado = this.downloadAcumulado.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount () {
    // endpoint para obtener los detalles del cuestionario
    // const { idQuizz } = this.props.match.params
    // const config = {
    //   headers: { idQuizz }
    // }
    // axios.get(`${domain}/endpointQuizz`, config) // endpoint dummie
    //   .then((res) => {
    //     const {quizz} = res.data
    //     this.setState({ quizz })
    //   })
    //   .catch((error) => {
    //     // console.log(error)
    //     this.setState({error: `get: ${error.message}`})
    //   })
    console.log('hello')
    console.log(muestra)
    this.setState({quizz: muestra})
  }

  downloadAcumulado () {
    const config = {
      headers: {'id': this.state.quizz.slug}
    }
    axios.get(`${domain}/getExcel`, config)
      .then((res) => {
        console.log(res)
        window.open(
          `${domain}/excel/${this.state.quizz.slug}`,
          '_blank' // <- This is what makes it open in a new window.
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  editCuestionario () {
    console.log('endpoint para editar cuestionario')
  }

  downloadIndividual () {
    console.log('url para descargar el Excel individual')
  }

  back () {
    window.location.href = `/admin/proyecto/${this.state.quizz.project}`
    // this.props.history.goBack()
  }

  render () {
    const {quizz, error} = this.state
    const {preguntas, respuestas, filtros, title} = quizz
    return (
      <section className='content-manager'>
        <div className='back'>
          <BackButton content='Proyectos' handleClick={this.back} />
        </div>
        {
          error
            ? <ErrorRequest />
            : <React.Fragment>
              <div className='actions-container detail'>
                <h1 className='view-title'>{title}</h1>
                <div>
                  <GeneralButton content='Descargar Excel' handleClick={this.downloadAcumulado} />
                  <GeneralButton content='Editar cuestionario' handleClick={this.editCuestionario} />
                </div>
              </div>
              <div className='overview-cuestionario'>
                <SimpleCard titleCard='Preguntas'>
                  <QuestionsList preguntas={preguntas} />
                </SimpleCard>
                <SimpleCard titleCard='Tipos (respuestas)'>
                  <TypeList respuestas={respuestas} />
                </SimpleCard>
              </div>
              <div className='overview-filters'>
                <h2>Filtros</h2>
                <div className='content-filters'>
                  <FilterList filtros={filtros} />
                </div>
              </div>
            </React.Fragment>
        }
      </section>
    )
  }
}

QuestionsList.propTypes = {
  // preguntas: PropTypes.objectOf(PropTypes.object)
}

FilterList.propTypes = {
  filtros: PropTypes.objectOf(PropTypes.object)
}

export default QuizzDetail
