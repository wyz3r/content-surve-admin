import React from 'react'
import PropTypes from 'prop-types'
import {ProjectCard, EmptyMessage} from './../Common'

const QuizzesCards = ({estimulos, viewQuizz}) => {
  const stimulusValue = Object.values(estimulos)
  const stimulusKeys = Object.keys(estimulos)
  if (stimulusKeys.length === 0) return <EmptyMessage size={'2rem'} />
  return (stimulusValue.map((dataItem, i) => {
    const {image, name, date, stimulus, filtros} = dataItem
    return <ProjectCard key={`card-${i + 1}`}
      handleClick={viewQuizz}
      image={image}
      name={name}
      date={date}
      stimulus={stimulus}
      filtros={filtros}
      cardId={stimulusKeys[i]}
      textButton={'Ver cuestionario'} />
  }))
}

QuizzesCards.propTypes = {
  estimulos: PropTypes.objectOf(PropTypes.object),
  viewQuizz: PropTypes.func
}

export default QuizzesCards
