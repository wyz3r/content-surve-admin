import React from 'react'
import PropTypes from 'prop-types'

class SucessNotice extends React.Component {
  componentDidMount () {
    this.calcHeight()

    window.addEventListener('resize', () => {
      this.calcHeight()
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.calcHeight())
  }

  calcHeight () {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    console.log(width)
    document.querySelector('.transition-left').style['border-width'] = `0px 0px ${height}px 100vw`
    document.querySelector('.transition-right').style['border-width'] = `${height}px 100vw 0px 0px`
  }

  render () {
    console.log(this.props)
    const {title, paragraph} = this.props
    return (
      <div className='success-confirm'>
        <div className='transition-left' />
        <div className='transition-right' />
        <div className='success-content'>
          <i className='far fa-check-circle' />
          <h1>{title}</h1>
          <p>{paragraph}</p>
          <button className='sweep-notice' onClick={() => { window.location.href = '/' }}>Ir al inicio</button>
        </div>
      </div>
    )
  }
}

SucessNotice.propTypes = {
  paragraph: PropTypes.string,
  title: PropTypes.string
}

SucessNotice.defaultProps = {
  paragraph: 'Ahora puedes continuar.',
  title: '¡Listo!'
}

export default SucessNotice
