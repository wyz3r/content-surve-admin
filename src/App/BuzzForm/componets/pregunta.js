import React from 'react'
import Respuestas from './respuestas'
import RespuestasImg from './respuetasImage'

const respuestIf = (respuestas, type, preguntaNum, handleAnswer) => {
  switch (type) {
    case 'text' :
      return (
        <Respuestas preguntaNum={preguntaNum} respuestas={respuestas} handleAnswer={handleAnswer} />
      )
    case 'image':
      return (
        <RespuestasImg preguntaNum={preguntaNum} respuestas={respuestas} handleAnswer={handleAnswer} />
      )
    default:
      return (
        <Respuestas preguntaNum={preguntaNum} respuestas={respuestas} handleAnswer={handleAnswer} />
      )
  }
}

const Pregunta = (props) => {
  const respuestas = props.pregunta.respuestas
  const type = props.pregunta.type
  return (
    <div className='preguntaContainer'>
      <div className='preguntaText'>{props.pregunta.pregunta}</div>
      {respuestIf(respuestas, type, props.preguntaNum, props.handleAnswer)}

    </div>
  )
}

export default Pregunta
