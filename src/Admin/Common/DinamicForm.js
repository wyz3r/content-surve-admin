import React from 'react'

class DinamicForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    const target = e.target
    const {name, value} = target
    this.setState({
      [name]: value
    })
  }

  onSubmit (e) {
    const {handleSave} = this.props
    e.preventDefault()
    handleSave(this.state)
  }

  onCancel (e) {
    const {handleCancel} = this.props
    e.preventDefault()
    handleCancel()
  }

  renderForm () {
    const {model} = this.props
    return model.map(m => {
      const {key, label, type, props} = m
      return (
        <React.Fragment key={key}>
          <label className='form-label'
            htmlFor={key}>
            {label}
          </label>
          <input {...props || {}}
            className='form-input'
            type={type || 'text'}
            name={key}
            onChange={(e) => { this.onChange(e) }} />
          <div className='invalid-feedback' />
        </React.Fragment>
      )
    })
  }

  render () {
    return (
      <form className={this.props.className}>
        {this.renderForm()}
        <div className='form-group'>
          <button className='general-button dangerButton'
            onClick={(e) => this.onCancel(e)}>
            Cancelar
          </button>
          <button className='general-button' type='submit' onClick={(e) => { this.onSubmit(e) }}>guardar</button>
        </div>
      </form>
    )
  }
}

export {DinamicForm}
