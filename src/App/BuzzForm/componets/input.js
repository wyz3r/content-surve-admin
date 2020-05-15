import React from 'react'

const Input = (props) => (
  <div className='inputContainer'>
    <label>{props.label}</label>
    <input type={props.type} onChange={(e) => { props.handleChange(e, props.name) }} />
  </div>
)

export default Input
