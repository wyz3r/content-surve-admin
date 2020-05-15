import React from 'react'
import PropTypes from 'prop-types'

class Paper extends React.Component {
  handlerFocus (e) {
    const label = e.target.parentNode.querySelector('label')
    label.classList.add('rigth-traslade')
  }

  handlerBlur (e) {
    const label = e.target.parentNode.querySelector('label')
    const input = e.target.parentNode.querySelector('input').value
    if (input.length === 0) {
      label.classList.remove('rigth-traslade')
    } else {
      return null
    }
  }

  renderForm (model, handlerChange) {
    return model.map(m => {
      const {key, label, type, props} = m
      return (
        <React.Fragment key={key}>
          <div className='input-content'>
            <label>
              {label}
            </label>
            <input {...props || {}}
              name={key}
              onChange={handlerChange}
              onFocus={this.handlerFocus}
              onBlur={this.handlerBlur}
              type={type || 'text'} />
          </div>
        </React.Fragment>
      )
    })
  }

  render () {
    const {principal,
      secundario,
      handlerChange,
      handlerSubmit,
      formModel,
      submitButton,
      children,
      errorText,
      errorStatus,
      estilo} = this.props
    return (
      <div className={`paper ${estilo}`}>
        <div className='header-paper'>
          <h1>{principal}</h1>
          <h2>{secundario}</h2>
        </div>
        <div className='content-paper'>
          <form className='paper-form' onSubmit={handlerSubmit} autoComplete='off'>
            {this.renderForm(formModel, handlerChange)}
            <button className='sweep-button' type='submit'>{submitButton}</button>
          </form>
        </div>
        <div className='error-form'>
          {
            errorStatus && <React.Fragment>
              <i className='fas fa-exclamation-triangle' />
              {errorText}
            </React.Fragment>
          }
        </div>
        <div className='footer-paper'>
          {
            children
          }
        </div>
      </div>
    )
  }
}

Paper.propTypes = {
  errorStatus: PropTypes.bool,
  errorText: PropTypes.string,
  estilo: PropTypes.string,
  formModel: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    props: PropTypes.object
  })).isRequired,
  handlerChange: PropTypes.func.isRequired,
  handlerSubmit: PropTypes.func.isRequired,
  principal: PropTypes.string,
  secundario: PropTypes.string,
  submitButton: PropTypes.string
}

Paper.defaultProps = {
  principal: 'Título',
  secundario: 'Comentario',
  submitButton: 'Acción'
}

export default Paper
