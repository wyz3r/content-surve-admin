import React, { Component } from 'react'
import axios from 'axios'
import ReactExport from 'react-data-export'
import firebase from 'firebase/app'
import { GeneralButton } from '../Common'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn


export default class ExcelExport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizzName: 'crea-tu-botella-de-tequila',
      name: 'crea-tu-botella-de-tequila',
      preguntas: [],
      dataset: [],
      numRegsitros: 0
    }
    this.exportExcel = this.exportExcel.bind(this)
    this.clearData = this.clearData.bind(this)


  }

  renderQuestions = (arrelgoDePreguntas = []) => {
    const elementos =  arrelgoDePreguntas.map(e => {
        return ( 
          <ExcelColumn key={e.pregunta} label={e.pregunta} value={e.pregunta}/>
        )
      })
    return elementos
  }
  clearData () {
    this.setState({
      dataset: [],
      quizzName: '',
      name: '',
      numRegsitros: 0
    })

  }
  exportExcel (e) {
    const {idcuestionarioExcell} = this.props
   if(idcuestionarioExcell === '') return 
    const quizzName = idcuestionarioExcell
    // const quizzName = 'cuentanos-como-eres-en-redes-sociales-y-adivinaremos-tu-edad-26 plus30'

    const url = 'https://s3-us-west-2.amazonaws.com/adbuzz/' + quizzName + '/data.json'

    axios.get(url, {idEstimulo: quizzName})
      .then( (response) => {
        const {data} = response
        const arrayData = []
        const preguntas = data.preguntas
        this.setState( {preguntas})
        firebase.firestore().collection(quizzName).get()
        .then((docRef) => {
          console.log('datos')
         
          docRef.forEach((doc) =>{
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data())
            const {type, fechaInicio, fechaTermino, respuestas} = doc.data()
            const obj = {
              'Informante': doc.id,
              'Fecha-inicio': fechaInicio,
              'Fecha-termino': fechaTermino,
              'Tipo': type
            }
            
            data.preguntas.forEach((element, index) => {
              const rresult = respuestas['r' + parseInt(index + 1, 10) ]
              const resultText = typeof rresult === 'object' ? rresult.join(',') : rresult
              obj[element.pregunta] = resultText
            })
            arrayData.push(obj)
            this.setState( {
              dataset: arrayData,
              quizzName: idcuestionarioExcell,
              name: idcuestionarioExcell,
              numRegsitros: docRef.size
            })
            // console.log(obj)
          })
        })
        .catch((error) => {
          alert('Error de servidor')
          console.error("Error adding document: ", error)
        })

        
      })
      .catch( (error) => {
        alert('no existe la comunidad')
        console.log(error)
    })
   }

  
  render() {
    const {dataset, preguntas, quizzName, numRegsitros} = this.state

    return (
      <div>
        {dataset.length === 0 ? <GeneralButton 
            content='traer info'
            handleClick={this.exportExcel}
          />
          : 
          <div>
            <ExcelFile element={<GeneralButton content='Descargar' />} filename={quizzName}>
                <ExcelSheet data={dataset} name={quizzName}>
                    <ExcelColumn label="Informante" value="Informante"/>
                    <ExcelColumn label="Fecha inicio" value="Fecha-inicio"/>
                    <ExcelColumn label="Fecha termino" value="Fecha-termino"/>
                      {this.renderQuestions(preguntas)}
                    <ExcelColumn label="Tipo" value="Tipo"/>
                </ExcelSheet>
            </ExcelFile>
            <GeneralButton
              styles={{marginTop: '10px', background: 'red', color: 'white', border: '1px solid white' }}
             content='borrar'
             handleClick={this.clearData}
            />
          </div>
          }
            
        <div className='datos-content'>
          <p>registros: {numRegsitros}</p>
        </div>
      </div>
    )
  }
}


