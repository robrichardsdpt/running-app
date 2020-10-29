import React from 'react'
import { Line } from 'react-chartjs-2'
import { MDBContainer } from 'mdbreact'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'

class ChartsPage extends React.Component {
  state = {
    token: this.props.user.token,
    userRuns: this.props.data,
    dataLine: {
      labels: [],
      datasets: [
        {
          label: 'Distance per run (miles)',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(184, 185, 210, .3)',
          borderColor: 'rgb(136, 26, 35)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(136, 26, 35)',
          pointBackgroundColor: 'rgb(255, 255, 255)',
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(0, 0, 0)',
          pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 10, 20]
        }]
    }
  }

  render () {
    const dateToArray = function (data) {
      const dataToArray = []
      for (let i = 0; i < data.length; i++) {
        dataToArray.push(data[i].date)
      }
      return (dataToArray)
    }
    const distanceToArray = function (data) {
      const dataToArray = []
      for (let i = 0; i < data.length; i++) {
        dataToArray.push(data[i].distance)
      }
      return (dataToArray)
    }
    console.log(this.props)
    const reversedData = this.props.data
    const dateArray = dateToArray(reversedData)
    const distanceArray = distanceToArray(reversedData)

    const dataCopy = Object.assign({}, this.state.dataLine)
    dataCopy.labels = dateArray
    dataCopy.datasets[0].data = distanceArray

    return (
      <div>
        <MDBContainer>
          <h3 className='mt-5'>Distance</h3>
          <Line data={dataCopy} options={{ responsive: true }} />
        </MDBContainer>
      </div>
    )
  }
}

export default ChartsPage
