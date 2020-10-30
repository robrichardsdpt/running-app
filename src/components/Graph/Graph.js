import React from 'react'
import { Line } from 'react-chartjs-2'
import { MDBContainer } from 'mdbreact'

class ChartsPage extends React.Component {
  state = {
    token: this.props.user.token,
    userRuns: this.props.data,
    dataLine: {
      labels: [],
      datasets: [
        {
          label: 'Average speed per run (mph)',
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(184, 185, 210, .3)',
          borderColor: 'rgb(35, 26, 136)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(35, 26, 136)',
          pointBackgroundColor: 'rgb(255, 255, 255)',
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(0, 0, 0)',
          pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }]
    }
  }

  render () {
    // gathers data for average speed array from props sent over
    const averageSpeedArray = function (data) {
      const dataToArray = []
      for (let i = 0; i < data.length; i++) {
        dataToArray.push(data[i].average_spd)
      }
      return (dataToArray)
    }

    // gathers data for date Array from props sent over
    const dateToArray = function (data) {
      const dataToArray = []
      for (let i = 0; i < data.length; i++) {
        dataToArray.push(data[i].date)
      }
      return (dataToArray)
    }

    // reverses data to present so that it is on the graph from earliest date to latest date
    const reversedData = this.props.data.reverse()

    // function calls with reversedData so consistency in data on charts.
    const avgSpdArray = averageSpeedArray(reversedData)
    const dateArray = dateToArray(reversedData)

    // copy Object so that you can send all of the data over to the chart
    const dataCopy = Object.assign({}, this.state.dataLine)
    dataCopy.labels = dateArray
    dataCopy.datasets[0].data = avgSpdArray

    return (
      <div>
        <MDBContainer>
          <h3 className='mt-5'>Average Speed</h3>
          <Line data={dataCopy} options={{ responsive: true }} />
        </MDBContainer>
      </div>
    )
  }
}

export default ChartsPage
