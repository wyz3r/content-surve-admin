import React from 'react'

const ResultContent = (props) => (
  <div className='resultContent'>
    <div className='resultSide'>
      <h2 className='resultTitle'>{props.result.name}</h2>
      <div className='resultDescription'>
        {props.result.description.split('\n').map((item, key) => {
          return <p key={key}>{item}</p>
        })}
      </div>
    </div>
    <div className='resultSide'>
      <img src={props.result.image} alt='result' />
    </div>
  </div>
)

export default ResultContent
