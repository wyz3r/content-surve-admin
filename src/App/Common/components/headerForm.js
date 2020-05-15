import React from 'react'

const HeaderForm = props => (
  <div className='HeaderForm'>
    {props.image ? <img src={props.image} className='logo' alt='logo' /> : ''}
    <div className='headerTitle'>{props.title}</div>
    <div className='headerDescription'>{props.description}</div>
  </div>
)

export default HeaderForm
