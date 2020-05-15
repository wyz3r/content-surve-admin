import React from 'react'
import Slider from 'react-slick'
import Pregunta from './pregunta'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipe: false
}

class renderPreguntas extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }

    this.handleAnswer = this.handleAnswer.bind(this)
  }

  handleAnswer (target, pregunta, respuesta) {
    console.log(this.slider)
    this.slider.slickNext()
    this.props.handleAnswer(target, pregunta, respuesta)
  }
  render () {
    const {data} = this.props

    return (
      <Slider ref={c => (this.slider = c)} {...settings}>
        {data.map((item, index) => {
          return <Pregunta pregunta={item} key={'pregunta' + index} preguntaNum={'r' + (index + 1)} handleAnswer={this.handleAnswer} />
        })}
      </Slider >
    )
  }
}

export default renderPreguntas
