import React, {Component} from 'react'
import ResultContent from './components/resultContent'
// import ResultChart from './components/resultChart'

class Result extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    const {type, respuestas} = this.props

    return (
      respuestas[type]
        ? <div className='resultContainer' id='result'>
          <div className='resultadoTitle'>Tu resultado</div>
          <ResultContent result={respuestas[type]} />
          {/* <ResultChart data={data} respuestas={respuestas} type={type} /> */}
        </div>
        : <div> No encontrado </div>
    )
  }
}

export default Result
