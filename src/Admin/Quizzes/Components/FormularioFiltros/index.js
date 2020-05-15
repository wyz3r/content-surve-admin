import React from 'react'

import Acordeon from '../../../Common/Acordeon/'
import CircleIconButton from '../../../Common/CircleIconButton'
import FormFiltroItem from './FormFiltroItem'
import uuidv1 from 'uuid/v1'

class FormularioFiltros extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filtroData: [],
      active: false
    }
    this.addFilterGroup = this.addFilterGroup.bind(this)
  }

  componentDidMount () {
    this.addFilterGroup()
  }

  componentDidUpdate (prevProps, prevState) {
    return true
  }

  addFilterGroup () {
    console.log('addFilterGroup()')
    const {filtroData} = this.state
    const uuid = uuidv1()
    filtroData[uuid] = {name: '', filter: []}
    console.log('filtroData', filtroData)
    this.setState({filtroData, active: uuid})
    console.log('<-- addFilterGroup()')
  }

  addFilter () {

  }

  render () {
    const {filtroData, active} = this.state
    return (
      <div >
        <h3>Filtros</h3>
        <Acordeon placeholder='Ponle un nombre al filtro'>
          {Object.keys(filtroData).map((id, index) => {
            return (
              <FormFiltroItem key={id} id={id} isOpen={active === id} action={this.AcordeonAction} />
            )
          })}
        </Acordeon>
        <div className='acordeonButtons'>
          <CircleIconButton
            iconClass='fa-plus'
            typeColor='doneButton'
            size='40px'
            textSize='25px'
            handleClick={this.addFilterGroup} />
        </div>
      </div>
    )
  }
}

export default FormularioFiltros
