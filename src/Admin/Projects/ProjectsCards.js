import React from 'react'
import PropTypes from 'prop-types'
import { ProjectCard, EmptyMessage } from './../Common'

const ProjectsCards = ({projects, viewProject}) => {
  const projectsValue = Object.values(projects)
  const projectsKeys = Object.keys(projects)

  if (projectsKeys.length === 0) return <EmptyMessage size={'2rem'} />
  return projectsValue.map((dataItem, i) => {
    const {image, name, date, stimulus, filtros} = dataItem
    return <ProjectCard key={`card-${i + 1}`}
      handleClick={viewProject}
      image={image}
      name={name}
      date={date}
      stimulus={stimulus}
      filtros={filtros}
      cardId={projectsKeys[i]}
      textButton={'Ver proyecto'} />
  })
}

ProjectsCards.propTypes = {
  projects: PropTypes.objectOf(PropTypes.object),
  viewProject: PropTypes.func
}

export default ProjectsCards
