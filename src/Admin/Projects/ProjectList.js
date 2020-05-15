import React from 'react'
// import axios from 'axios'
import { GeneralButton } from '../Common'
import ExcelComponent from './ExcelExport'
import firebase from 'firebase/app'

// import ProjectsCards from './ProjectsCards'

// const domain = process.env.REACT_APP_URL

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // projects: [{
      //   filtros: 'M',
      //   stimulus: '18',
      //   date: '16-sep-2019',
      //   name: 'este es tu pinche loco modelo',
      //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLRBVMLE9h8qALA46scey8iD4v9k2ut4W-8i7qxQ_wmIzviz3O'}],
      // error: '',
      idcuestionario: '',
      idcuestionarioExcell: '',
      idcuestionarioborrar:''
    }
    this.viewProject = this.viewProject.bind(this)
    this.edicionCopia = this.edicionCopia.bind(this)
    this.borrar = this.borrar.bind(this)
  }

  componentWillMount () {
    // const {idToken} = window.localStorage // id usuario loggeado
    // const config = {
    //   headers: {'id': idToken}
    // }    
  }

  viewProject (id) {
    window.location.href = `/admin/proyecto/${id}`
  }

  addProject () {
    window.localStorage.removeItem('cuestionario')
    window.localStorage.removeItem('preguntas')
    window.localStorage.removeItem('respuestas')
    window.localStorage.removeItem('currentStep')
    window.location.href = '/admin/quizzes/nuevo'
  }

  edicionCopia () {
   
    if(this.state.idcuestionario !== '') {
      window.location.href = '/admin/quizzes/' + this.state.idcuestionario
    }
  }

  borrar () {

    console.log(this.state.idcuestionarioborrar)
    var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
    

  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  render () {
    // const {projects, error} = this.state
    return (
      <section className='content-manager'>
        <div className='back'>
          <h2 className='saludo-cordial'>¡Bienvenido, administrador!</h2>
        </div>
        <div className='actions-container'>
          <h1 className='view-title'>Crear Cuestionarios</h1>
        </div>
        
        <div className='contendedor-opctions'>
          <div className='card'>
          <label>Crear un nuevo cuestionario </label>
            <GeneralButton 
                content='Crear Cuestionario'
                handleClick={this.addProject}
              />
          </div>
          <div className='card'>
          <label>Revisar o editar un cuestionario pasado </label>
            <GeneralInput
              name='idcuestionario'
              handleChange={(e) => this.handleChange(e)}
              placeholder='id: que-tipo-de-macho-eres'
              value={this.state.idcuestionario}
              type='text'
             />
          <GeneralButton 
            content='Copia o edición'
            handleClick={this.edicionCopia}
            
          />
          </div>
          <div className='card'>
          <label>Excel </label>
            <GeneralInput
            idcuestionarioExcell
              name='idcuestionarioExcell'
              handleChange={(e) => this.handleChange(e)}
              placeholder='id: que-tipo-de-macho-eres'
              value={this.state.idcuestionarioExcell}
              type='text'
             />
            <ExcelComponent  idcuestionarioExcell={this.state.idcuestionarioExcell}/>
          </div>
          <div className='card'>
          <label>borrar </label>
            <GeneralInput
              name='idcuestionarioborrar'
              handleChange={(e) => this.handleChange(e)}
              placeholder='id: que-tipo-de-macho-eres'
              value={this.state.idcuestionarioborrar}
              type='text'
             />
             <GeneralButton 
            content='borrar'
            handleClick={this.borrar}
          />
          
           
          </div>
          
        </div>
      </section>
    )
  }
}
const GeneralInput = ({value, placeholder, name, text, handleChange, type, handleMouseLeave, readonly, requerido = true}) => (
  <React.Fragment >
    <input className='form-control'
      maxLength='300'
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      type={type}
      onMouseLeave={handleMouseLeave}
      readOnly={readonly}
      required={requerido} />
    <div className='invalid-feedback' />
  </React.Fragment>
)
export default Projects
