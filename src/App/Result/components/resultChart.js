import React from 'react'
import {Pie} from 'react-chartjs-2'

const options = {
  legend: {
    display: true,
    position: 'left',
    labels: {
      fontSize: 14
    }
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex]
        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue
        })
        var currentValue = dataset.data[tooltipItem.index]
        var percentage = Math.floor(((currentValue / total) * 100) + 0.5)
        return data.labels[tooltipItem.index] + ': ' + percentage + '%'
      }
    }
  }
}

const colors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#ccc',
  '#3e44e3'
]

const ResultChart = (props) => {
  const {data, respuestas, type} = props
  let total = 0

  const labels = data.map(element => {
    total += element.value
    return respuestas[element.name.split('tipo')[1]].name
  })

  const numbers = data.map(element => {
    return (element.value)
  })

  let percentType = 0

  data.forEach(element => {
    if (element.name === 'tipo' + type) percentType = (element.value * 100) / total
  })

  const dataChart = {
    labels: labels,
    datasets: [{
      data: numbers,
      backgroundColor: colors
    }]
  }

  return (
    <div className='ResultChart'>
      <div className='resultChartSide'>
        <Pie data={dataChart} options={options} />
      </div>
      <div className='resultChartSide' >
        <p>Perteneces al <b>{Math.floor(percentType)}%</b> de las marcas que su contenido es como <b>{respuestas[type].name}</b></p>
      </div>
    </div>
  )
}

export default ResultChart
