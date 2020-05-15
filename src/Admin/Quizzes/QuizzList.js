import React from 'react'
import axios from 'axios'
import { GeneralButton, BackButton, ErrorRequest } from './../Common'
import QuizzesCards from './QuizzesCards'

const domain = process.env.REACT_APP_URL

class QuizzList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      estimulos: {},
      projectName: '',
      modalOpen: false,
      error: ''
    }
    this.viewQuizz = this.viewQuizz.bind(this)
    this.back = this.back.bind(this)
    this.addQuizz = this.addQuizz.bind(this)
  }

  componentDidMount () {
    const { projectid } = this.props.match.params
    // endpoint con los quizz segun el id de proyecto.
    const config = {
      headers: { projectid }
    }
    console.log('hello')
    axios.get(`${domain}/getstimulus`, config) // endpoint dummie
      .then((res) => {
        console.log(res.data)
        const estimulos = res.data
        console.log(estimulos)
        this.setState({estimulos})
      })
      .catch((error) => {
        // console.log(error)
        this.setState({error: `get: ${error.message}`})
      })

    // this.setState({
    //   estimulos: { 'nombre-de-el-estiimulo-dos':
    //   { name: 'nombre-de-el-estiimulo-dos',
    //     image:
    //      'https://s3-us-west-2.amazonaws.com/adbuzz/multimedia/como-1.jpg' },
    //   'nombre-de-el-estiimulo':
    //   { name: 'nombre-de-el-estiimulo',
    //     image:
    //      'https://s3-us-west-2.amazonaws.com/adbuzz/multimedia/como-1.jpg' } }
    // })
  }

  viewQuizz (id) {
    window.location.href = `/admin/quizz/${id}`
  }

  addQuizz () {
    const { projectid } = this.props.match.params
    window.location.href = `/admin/quizzes/${projectid}/nuevo`
  }

  back () {
    window.location.href = '/admin/proyectos'
  }

  render () {
    const {estimulos, projectName, error} = this.state
    return (
      <section className='content-manager'>
        <div className='back'>
          <BackButton content='Proyectos' handleClick={this.back} />
        </div>
        <div className='actions-container'>
          <h1 className='view-title'>{projectName}</h1>
          <GeneralButton content='Crear cuestionario' handleClick={this.addQuizz} />
        </div>
        <div className='content-cards'>
          {
            error
              ? <ErrorRequest />
              : <QuizzesCards estimulos={estimulos} viewQuizz={this.viewQuizz} />
          }
        </div>
      </section>
    )
  }
}

export default QuizzList
