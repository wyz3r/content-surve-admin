import React from 'react'
import axios from 'axios'
import {validate} from './../helpers/validate'
import {DinamicForm, ErrorSend} from './../Common'

const domain = process.env.REACT_APP_URL

class AddProject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      error: ''
    }
    this.saveProject = this.saveProject.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.cancelAddProject = this.cancelAddProject.bind(this)
  }

  saveProject (projectInfo) {
    const element = document.querySelector('.dynamic-form')
    if (validate(element)) {
      const { name, description, mark, category } = projectInfo
      const { idToken } = window.localStorage
      const body = {
        'id': idToken,
        'projectPayload': {
          name,
          description,
          mark,
          category
        }
      }
      axios.post(`${domain}/addProjects`, body)
        .then((res) => {
          window.location.href = '/admin/proyectos'
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.localStorage.idToken = ''
            window.location.href = '/'
          } else {
            this.setState({error, modalOpen: true})
          }
      })
    }
  }
  onCloseModal () {
    this.setState({modalOpen: false})
  }

  cancelAddProject () {
    window.location.href = '/admin/proyectos'
  }

  render () {
    const {modalOpen} = this.state
    return (
      <div className='create-project'>
        <div className='form-create'>
          <h1>Crear un proyecto</h1>
          <p>Llena los siguientes campos para crear tu proyecto.</p>
          <DinamicForm className='dynamic-form'
            model={[
              {key: 'name', label: 'Nombre', props: {required: true}}
              // {key: 'description', label: 'Descripción', props: {required: true}},
              // {key: 'mark', label: 'Cliente/Marca', props: {required: true}},
              // {key: 'category', label: 'Categoría', props: {required: true}}
            ]}
            handleSave={this.saveProject}
            handleCancel={this.cancelAddProject} />
        </div>
        <ErrorSend onCloseModal={this.onCloseModal} modalOpen={modalOpen} />
      </div>
    )
  }
}

export default AddProject
