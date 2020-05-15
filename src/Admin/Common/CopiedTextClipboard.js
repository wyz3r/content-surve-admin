import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class CopiedTextClipboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      copySuccess: false
    }
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.closeAlertCopied = this.closeAlertCopied.bind(this)
  }

  copyToClipboard (e) {
    const node = ReactDOM.findDOMNode(this)
    const textCopy = node.querySelector('.text-to-copy')
    textCopy.select()
    document.execCommand('copy')
    e.target.focus()
    this.setState({ copySuccess: true })
  }

  closeAlertCopied () {
    this.setState({
      copySuccess: false
    })
  }

  render () {
    const {textToCopy} = this.props
    return (
      <div className='copy-text' tabIndex='0' onBlur={this.closeAlertCopied}>
        <input className='text-to-copy' type='text' defaultValue={textToCopy} />
        <button className='button-to-copy' onClick={this.copyToClipboard}>
          <i className='fas fa-copy' />
          {
            this.state.copySuccess && <div className='alert-copied'>
              <div className='triangle' />
              <div className='content-alert'>
                <p>¡Copiado!</p>
              </div>
            </div>
          }
        </button>
      </div>
    )
  }
}

export {CopiedTextClipboard}

CopiedTextClipboard.propTypes = {
  textToCopy: PropTypes.string.isRequired
}

CopiedTextClipboard.defaultProps = {
  textToCopy: ''
}
