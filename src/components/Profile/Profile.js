import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Graph from '../Graph/Graph'
import DistanceGraph from '../Graph/DistanceGraph'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      userRuns: [],
      token: this.props.user.token
    } // this.state
  } // constructor

  componentDidMount () {
    // get index request
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
      .catch(console.error)
  }

  render () {
    // converts time to user friendly format
    const timeConverted = function (seconds) {
      const hours = Math.floor(seconds / (60 * 60))

      const divisorForMinutes = seconds % (60 * 60)
      const minutes = Math.floor(divisorForMinutes / 60)

      const divisorForSeconds = divisorForMinutes % 60
      const secs = Math.ceil(divisorForSeconds)

      const obj = {
        'h': hours,
        'm': minutes,
        's': secs
      }
      if (obj.m < 10) {
        obj.m = `0${obj.m}`
      }
      if (obj.s < 10) {
        obj.s = `0${obj.s}`
      }
      return `${obj.h}:${obj.m}:${obj.s}`
    }

    // calculates total Time and presents in user friendly format
    const totalTimeRunning = function (array) {
      let totalTime = 0
      for (let i = 0; i < array.length; i++) {
        totalTime += array[i].time
      }
      const hours = Math.floor(totalTime / (60 * 60))

      const divisorForMinutes = totalTime % (60 * 60)
      const minutes = Math.floor(divisorForMinutes / 60)

      const divisorForSeconds = divisorForMinutes % 60
      const secs = Math.ceil(divisorForSeconds)

      const obj = {
        'h': hours,
        'm': minutes,
        's': secs
      }
      if (obj.m < 10) {
        obj.m = `0${obj.m}`
      }
      if (obj.s < 10) {
        obj.s = `0${obj.s}`
      }
      return `${obj.h}:${obj.m}:${obj.s}`
    }

    // calculates average time running and presents in user friendly format
    const averageTimeRunning = function (array) {
      let totalTime = 0
      for (let i = 0; i < array.length; i++) {
        totalTime += array[i].time
      }
      const averageTime = totalTime / array.length
      const hours = Math.floor(averageTime / (60 * 60))

      const divisorForMinutes = averageTime % (60 * 60)
      const minutes = Math.floor(divisorForMinutes / 60)

      const divisorForSeconds = divisorForMinutes % 60
      const secs = Math.ceil(divisorForSeconds)

      const obj = {
        'h': hours,
        'm': minutes,
        's': secs
      }
      if (obj.m < 10) {
        obj.m = `0${obj.m}`
      }
      if (obj.s < 10) {
        obj.s = `0${obj.s}`
      }
      return `${obj.h}:${obj.m}:${obj.s} per run`
    }

    // calculates the total distance ran
    const totalDistanceRunning = function (array) {
      let totalDistance = 0
      for (let i = 0; i < array.length; i++) {
        totalDistance += array[i].distance
      }
      return totalDistance
    }

    // JSX for all runs to be shown on index
    const userRunArray = this.state.userRuns.map(run => {
      return (
        <div key={run.id} size="4" className="stack">
          <Col className='card-header'>
            <h5>{run.date}</h5>
            <Link to={`/run-detail/${run.id}`}><Button className='edit-run-profile'> Edit</Button></Link>
          </Col>
          <Col>
            Location:  {run.location}
          </Col>
          <Col>
            Duration:  {timeConverted(run.time)}
          </Col>
          <Col>
            Distance run (in miles):  {run.distance}
          </Col>
          <Col>
            Average pace:  {run.average_pace}
          </Col>
          <Col>
            Average speed:  {parseFloat(run.average_spd).toFixed(2)} mph
          </Col>
          <Col>
            Difficulty (RPE):  {run.rpe} out of 10
          </Col>
          <Col>
            Notes:  {run.notes}
          </Col>
        </div>
      )
    })

    // calculates maxTimeRunning and presents in userFriendly format
    const maxTimeRunning = function (array) {
      let maxTime = 0
      for (let i = 0; i < array.length; i++) {
        if (array[i].time > maxTime) {
          maxTime = array[i].time
        }
      }
      const hours = Math.floor(maxTime / (60 * 60))

      const divisorForMinutes = maxTime % (60 * 60)
      const minutes = Math.floor(divisorForMinutes / 60)

      const divisorForSeconds = divisorForMinutes % 60
      const secs = Math.ceil(divisorForSeconds)

      const obj = {
        'h': hours,
        'm': minutes,
        's': secs
      }
      if (obj.m < 10) {
        obj.m = `0${obj.m}`
      }
      if (obj.s < 10) {
        obj.s = `0${obj.s}`
      }
      return `${obj.h}:${obj.m}:${obj.s}`
    }

    // calculates average distance per run
    const averageDistancePerRun = function (distance, runs) {
      return parseFloat(distance / runs).toFixed(2)
    }

    // calculates max distance ran in one run
    const maxDistanceRunning = function (array) {
      let maxDistance = 0
      for (let i = 0; i < array.length; i++) {
        if (array[i].distance > maxDistance) {
          maxDistance = array[i].distance
        }
      }
      return maxDistance
    }

    // calculates the average pace
    const averagePace = function (distance, array) {
      let totalTime = 0
      for (let i = 0; i < array.length; i++) {
        totalTime += array[i].time
      }
      const milesUncorrected = (totalTime / 60) / distance
      const milesInMinutes = Math.floor(milesUncorrected)
      const remainder = milesUncorrected - milesInMinutes
      let seconds = remainder * 60
      seconds = Math.round(seconds)
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${milesInMinutes}:${seconds}`
    }

    // finds the fastest pace and speed for a run
    const fastestPace = function (array) {
      let fastestSpd = 0
      let fastestPace = ''
      for (let i = 0; i < array.length; i++) {
        if (array[i].average_spd > fastestSpd) {
          fastestSpd = parseFloat(array[i].average_spd).toFixed(2)
          fastestPace = array[i].average_pace
        }
      }
      return `${fastestPace} or ${fastestSpd} mph`
    }

    // conditions for isLoading, if there are no runs, and other situations.  Page populates with information if there are more than 0 runs
    let jsx
    let jsxData
    // while the runs are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      jsxData = <p>Loading...</p>
      // if no runs
    } else if (this.state.userRuns.length === 0) {
      jsx = <p>No runs, please add one. </p>
      jsxData = <p>No runs, please add one. </p>
      // when the request is complete
    } else {
      jsx = (
        <Container>
          {userRunArray}
        </Container>
      )
      jsxData = (
        <Col className="stats">
          <h4>{`Runs Tracked: ${userRunArray.length}`}</h4>
          <div className='inDepthStats'>
            <h4>{`Total Time Running: ${totalTimeRunning(this.state.userRuns)}`}</h4>
            <h4>{`Average Time Running: ${averageTimeRunning(this.state.userRuns)}`}</h4>
            <h4>{`Longest Run (in time): ${maxTimeRunning(this.state.userRuns)}`}</h4>
            <h4>{`Total Distance Ran: ${totalDistanceRunning(this.state.userRuns)} miles`}</h4>
            <h4>{`Average Distance per run: ${averageDistancePerRun(totalDistanceRunning(this.state.userRuns), userRunArray.length)} miles`}</h4>
            <h4>{`Longest Run (in distance): ${maxDistanceRunning(this.state.userRuns)} miles`}</h4>
            <h4>{`Average Pace: ${averagePace(totalDistanceRunning(this.state.userRuns), this.state.userRuns)} per mile`}</h4>
            <h4>{`Fastest Pace: ${fastestPace(this.state.userRuns)}`}</h4>
          </div>
          <AuthenticatedRoute user={this.state.token} render={() => (
            <Graph clearUser={this.clearUser} user={this.state.token} data = {this.state.userRuns}/>
          )} />
          <AuthenticatedRoute user={this.state.token} render={() => (
            <DistanceGraph clearUser={this.clearUser} user={this.state.token} data = {this.state.userRuns}/>
          )} />
        </Col>
      )
    }
    return (
      <div className='container'>
        <h1 className='user-name'>{this.props.user.email}</h1>
        <div className='row'>
          {jsxData}
          <Col className='column-for-data'>
            {jsx}
          </Col>
        </div>
      </div>
    ) // return
  } // render
}

export default Profile
