import React from 'react'
import PropTypes from 'prop-types'
import {CopiedTextClipboard} from './'

const ProjectCard = ({image, name, date, stimulus, filtros, textButton, cardId, handleClick}) => {
  return (
    <div className='card project-card'>
      <div className='card-header'>
        { image && <img src={image} alt='card-header' /> }
      </div>
      <div className='card-body'>
        <h2>{name}</h2>
        <div className='numbers-items'>
          { filtros ? 'Filtros' : 'Estímulos' }
          <div className='circulo'>{filtros || stimulus}</div>
        </div>
        <p>{date}</p>
      </div>
      <div className='card-footer' >
        <p className='more-info' onClick={() => handleClick(cardId)}>{textButton}
          <i className='fas fa-chevron-right' />
        </p>
      </div>
      { !image && <div className='auxiliar' /> }
    </div>
  )
}

const SimpleCard = ({titleCard, children}) => {
  return (
    <div className='card simple-card'>
      { titleCard && <h3>{titleCard}</h3> }
      { children }
    </div>
  )
}

const FilterCard = ({name, url, valores, handleClick}) => {
  return (
    <div className='card filter-card'>
      <h3>{name}</h3>
      <CopiedTextClipboard textToCopy={url} />
      <div className='tag-container'>
        {
          Object.values(valores).map((item, i) => {
            const {variableValor, valor} = item
            return <div key={`tag-${i + 1}`} className='tag'>
              {`${variableValor}: ${valor}`}
            </div>
          })
        }
      </div>
      <div className='download-content'>
        <button className='download-excel' onClick={handleClick}>Descargar Excel</button>
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  cardId: PropTypes.string,
  date: PropTypes.string,
  filtros: PropTypes.number,
  handleClick: PropTypes.func,
  image: PropTypes.string,
  name: PropTypes.string,
  stimulus: PropTypes.number,
  textButton: PropTypes.string
}

SimpleCard.propTypes = {
  titleCard: PropTypes.string
}

FilterCard.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  valores: PropTypes.arrayOf(PropTypes.object)
}

export {ProjectCard, SimpleCard, FilterCard}
