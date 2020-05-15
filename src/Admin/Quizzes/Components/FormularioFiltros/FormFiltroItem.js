import React from 'react'
import CircleIconButton from '../../../Common/CircleIconButton'

const FiltroInput = ({value, label, name, handleChange}) => (
  <div className='filtroInput'>
    <label >{label}</label>
    <input
      className='form-control'
      name={name}
      type='text'
      value={value}
      onChange={(e) => handleChange(e)} />
  </div>
)

const FiltroItem = ({name, keyV, value, valueKey, handleChange}) => {
  const inputs = [
    {name: 'name', label: 'Nombre', value: name},
    {name: 'keyV', label: 'Variable en url', value: keyV},
    {name: 'value', label: 'Valor', value: value},
    {name: 'valueKey', label: 'Variable del valor', value: valueKey}
  ]

  return (
    <React.Fragment>
      {inputs.map((item, index) => (
        <FiltroInput key={index} name={item.name} label={item.label} value={item.value} handleChange={handleChange} />
      ))}
    </React.Fragment>
  )
}

class FormFiltroItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      value: '',
      keyV: '',
      valueKey: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addFiltroItem = this.addFiltroItem.bind(this)
  }

  componentDidMount () {
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  addFiltroItem () {
    console.log()
  }

  render () {
    const {name, keyV, value, valueKey} = this.state
    return (
      <div className='filtroContainer'>
        <div className='filtroSides'>
          <div className='filtroSideForm'>
            <FiltroItem name={name} keyV={keyV} value={value} valueKey={valueKey} handleChange={this.handleChange} />
          </div>
          <div className='filtroSideButtons'>
            <CircleIconButton handleClick={this.addFiltroItem} iconClass='fa-minus' typeColor='dangerButton' />
          </div>
        </div>
      </div>
    )
  }
}

export default FormFiltroItem
