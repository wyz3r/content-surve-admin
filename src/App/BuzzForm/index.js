import React, { Component } from 'react'
import axios from 'axios'
import easyScroll from 'easy-scroll'
import ReactGA from 'react-ga'
import {getCookie} from '../Common/cookie'
import querySearch from 'stringquery'

import ModalDatos from './componets/modalDatos'
import Pregunta from './componets/pregunta'
import {Loading, HeaderForm} from '../Common'

import Result from '../Result/'
ReactGA.initialize('UA-46508407-15')

const renderPreguntas = (data, handleAnswer) => (<div className='preguntas'>
  {data.map((item, index) => {
    return <Pregunta pregunta={item} key={'pregunta' + index} preguntaNum={'r' + (index + 1)} handleAnswer={handleAnswer} />
  })}
</div>)

class BuzzForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      respuestas: {},
      modalOpen: false,
      data: {},
      result: '',
      resultData: {},
      modalError: false
    }

    this.handleAnswer = this.handleAnswer.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.send = this.send.bind(this)
  }

  onOpenModal () {
    this.setState({ modalOpen: true })
  }

  onCloseModal () {
    this.setState({ modalOpen: false })
  }

  handleAnswer (target, pregunta, respuesta) {
    if (!target.parentNode.classList.contains('done')) {
      target.parentNode.classList.add('done')
      target.classList.add('active')
      const respuestas = this.state.respuestas

      respuestas[pregunta] = respuesta
      this.setState({respuestas}, () => this.finishForm())
    }
  }

  finishForm () {
    const {respuestas, datos} = this.state

    if (Object.keys(respuestas).length >= datos.preguntas.length) {
      this.send()
    }
  }

  handleChange (e, name) {
    const data = this.state.data
    data[name] = e.target.value
    this.setState({data})
  }

  send () {
    const {respuestas, id} = this.state

    // if (Object.keys(data).length < 3) {
    //   this.setState({modalError: 'Debes llenar todos los campos.'})
    //   return false
    // }

    const result = this.calculateResult(respuestas)

    const url = process.env.REACT_APP_URL + '/addInfo'

    const getCookieGA = (cb) => {
      const gaCookie = getCookie('_ga')
      if (gaCookie && gaCookie.length > 0) {
        cb(gaCookie)
      } else {
        setTimeout(() => {
          getCookieGA(cb)
        }, 500)
      }
    }

    const sendData = (gaCookie) => {
      const DataSend = {
        respuestas,
        'type': 'tipo' + result,
        'idEstimulo': id,
        'idUsuario': gaCookie,
        'filtros': querySearch(this.props.location.search)
      }

      this.setState({result})

      const _self = this

      axios.post(url, DataSend)
        .then(function (response) {
          const {resultData} = response.data
          // const resultTipo = tipo === undefined ? result : tipo.split('tipo')[1] // eslint-disable-next-line
          _self.setState({resultData})
          _self.onCloseModal()
          const scroll = document.getElementById('result').offsetTop
          easyScroll({
            'scrollableDomEle': window,
            'direction': 'bottom',
            'duration': 1000,
            'easingPreset': 'easeInQuad',
            'scrollAmount': scroll + 200
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    getCookieGA(sendData)
  }

  calculateResult (respuestas) {
    const typeArray = {}
    Object.keys(respuestas).forEach((key) => {
      if (typeArray.hasOwnProperty(respuestas[key])) {
        typeArray[respuestas[key]]++
      } else {
        typeArray[respuestas[key]] = 0
      }
    })

    var max = Math.max.apply(null,
      Object.keys(typeArray).map(e => {
        return typeArray[e]
      }))

    const dulplicate = []

    Object.keys(typeArray).forEach(key => {
      if (typeArray[key] === max) dulplicate.push(key)
    })

    if (dulplicate.length > 1) return dulplicate[Math.floor(Math.random() * dulplicate.length)]

    return dulplicate[0]
  }

  componentDidMount () {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    window.scrollTo(0, 0)

    const {id} = this.props.match.params
    this.setState({id})

    const url = 'https://s3-us-west-2.amazonaws.com/adbuzz/' + id + '/data.json'

    const _this = this

    axios.get(url, {idEstimulo: id})
      .then(function (response) {
        const {data} = response
        _this.setState({'datos': data})
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const {modalOpen, result, resultData, modalError, datos} = this.state

    if (datos) {
      const {preguntas, respuestas, title, description, logo} = datos
      return (
        <div className='main-app'>
          <HeaderForm title={title} description={description} image={logo} />
          <div className='container containerForm'>
            {renderPreguntas(preguntas, this.handleAnswer)}
          </div>
          { (result) ? <Result respuestas={respuestas} type={result} data={resultData} /> : '' }
          <ModalDatos
            send={this.send}
            handleChange={this.handleChange}
            modalOpen={modalOpen}
            modalError={modalError}
          />
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

export default BuzzForm
