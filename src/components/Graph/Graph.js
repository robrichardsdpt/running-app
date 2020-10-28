import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
// const CanvasJS = CanvasJSReact.CanvasJS
import axios from 'axios'
import apiUrl from '../../apiConfig'
const CanvasJSChart = CanvasJSReact.CanvasJSChart

const dataPoints = []
class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      userRuns: [],
      token: this.props.user.token
    } // this.state
  } // constructor
  render () {
    const options = {
      theme: 'light2',
      title: {
        text: 'Average Speed'
      },
      axisY: {
        title: 'Speed (mph)'
      },
      data: [{
        type: 'line',
        xValueFormatString: 'MMM YYYY',
        yValueFormatString: '00.00',
        dataPoints: dataPoints
      }]
    }
    return (
      <div>
        <CanvasJSChart options = {options}
        /*  onRef={ref => this.chart = ref} */
        />
      </div>
    )
  }

  componentDidMount () {
    const chart = this.chart
    axios({
      url: `${apiUrl}/runs/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          userRuns: response.data.runs
        })
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          dataPoints.push({
            x: new Date(this.state.runs.data[i].time),
            y: this.state.runs.data[i].average_spd
          })
        }
        chart.render()
      })
      .catch(console.error)
  }
}

export default Graph
