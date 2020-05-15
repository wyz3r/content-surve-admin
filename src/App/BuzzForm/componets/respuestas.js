import React from 'react'

const Respuestas = props => (
  <div className='respuestasContainer'>
    {props.respuestas.map((element, index) => {
      let classes = (element.text.length > 120) ? 'respuestaItem textLong' : 'respuestaItem'
      return <div className={classes} key={index} onClick={(e) => props.handleAnswer(e.target, props.preguntaNum, element.key)}> {element.text} </div>
    })}
  </div>

)

export default Respuestas
