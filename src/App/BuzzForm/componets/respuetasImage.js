import React from 'react'

const RespuestasImg = props => (
  <div className='respuestasContainer'>
    {props.respuestas.map((element, index) => (
      <div className='respuestasImageCont' key={'imgresp ' + index} onClick={
        (e) => {
          const target = e.target.parentNode.parentNode
          props.handleAnswer(target, props.preguntaNum, element.key)
        }
      }>
        <div className='respuestaImg'>
          <img src={element.image} alt='meme' />
        </div>
        <div className='respuestaText'>{element.text}</div>
      </div>
    ))}
  </div>
)

export default RespuestasImg
