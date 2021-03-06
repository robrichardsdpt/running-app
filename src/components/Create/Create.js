import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import 'react-datepicker/dist/react-datepicker.css'

class CreateRun extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      run: {
        date: null,
        time: '',
        distance: '',
        average_pace: '',
        average_spd: '',
        notes: '',
        rpe: '',
        location: '',
        owner: ''
      },
      token: this.props.user.token,
      newDate: null,
      totalTimeInSeconds: 0
    }
  }

  // handles the time change element and converts from user friendly format to seconds, intuitively
  handleTimeChange = (event) => {
    const timeArray = event.target.value.split(':')
    if (timeArray.length === 3) {
      const hours = parseInt(timeArray[0])
      const minutes = parseInt(timeArray[1])
      const seconds = parseInt(timeArray[2])
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      if (runCopy.distance && runCopy.time) {
        const pace = this.averagePace(runCopy.distance, runCopy.time)
        const speed = this.averageSpeed(runCopy.distance, runCopy.time)
        runCopy['average_pace'] = pace
        runCopy['average_spd'] = speed
      }
      this.setState({
        totalTimeInSeconds: totalSeconds,
        run: runCopy
      })
    } else if (timeArray.length === 2) {
      const minutes = parseInt(timeArray[0])
      const seconds = parseInt(timeArray[1])
      const totalSeconds = (minutes * 60) + seconds
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      if (runCopy.distance && runCopy.time) {
        const pace = this.averagePace(runCopy.distance, runCopy.time)
        const speed = this.averageSpeed(runCopy.distance, runCopy.time)
        runCopy['average_pace'] = pace
        runCopy['average_spd'] = speed
      }
      this.setState({
        totalTimeInSeconds: totalSeconds,
        run: runCopy
      })
    } else if (timeArray.length === 1) {
      const totalSeconds = parseInt(timeArray[0])
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      if (runCopy.distance && runCopy.time) {
        const pace = this.averagePace(runCopy.distance, runCopy.time)
        const speed = this.averageSpeed(runCopy.distance, runCopy.time)
        runCopy['average_pace'] = pace
        runCopy['average_spd'] = speed
      }
      this.setState({
        totalTimeInSeconds: totalSeconds,
        run: runCopy
      })
    } else {
      console.error('put the appropriate amount of data')
    }
  }

  // calculates average pace based on input of time and distance.  Returns in user friendly format.
  averagePace = (distance, time) => {
    const milesUncorrected = (time / 60) / distance
    const milesInMinutes = Math.floor(milesUncorrected)
    const remainder = milesUncorrected - milesInMinutes
    let seconds = remainder * 60
    seconds = Math.round(seconds)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${milesInMinutes}:${seconds} min/mile`
  }

  // calculates average speed based on user input of time and distance.
  averageSpeed = (distance, time) => {
    const runSpeed = (distance * 3600) / (time)
    return runSpeed
  }

  // handles all other user input
  handleChange = (event) => {
    const formattedTime = this.state.totalTimeInSeconds
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const runKey = event.target.name
    // make a copy of the state
    const runCopy = Object.assign({}, this.state.run) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    runCopy[runKey] = userInput
    runCopy['time'] = formattedTime
    if (runCopy.distance && formattedTime) {
      const pace = this.averagePace(runCopy.distance, formattedTime)
      const speed = this.averageSpeed(runCopy.distance, formattedTime)
      runCopy['average_pace'] = pace
      runCopy['average_spd'] = speed
    }
    // updating the state with our new copy
    this.setState({ run: runCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const run = this.state.run
    axios({
      url: `${apiUrl}/runs/`,
      method: 'POST',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        run: run
      }
    })
      .then((response) => this.setState({
        createdRunId: response.data.run.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Run Created With Success',
        message: messages.uploadRunSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload new run, failed with error: ' + error.messages,
          message: messages.uploadRunFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div className='top-of-create'>
        <h1 className='user-name'>{this.props.user.email}</h1>
        <div className='create-stack'>
          <div className='create-header'>
            <h3>Create a new run</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label><h5>Date:</h5></Form.Label>
              <Form.Control
                name="date"
                id="date"
                type="date"
                placeholder="MM/DD/YYYY"
                onChange={ this.handleChange}
              />
              <Form.Label><h5>Time taken(HH:MM:SS):</h5></Form.Label>
              <Form.Control name="time" id="time" onChange={this.handleTimeChange} type="text" placeholder="00:00:00" />
              <Form.Label><h5>Distance (miles):</h5></Form.Label>
              <Form.Control name="distance" id="distance" onChange={this.handleChange} type="number" min="0" placeholder="0.00" step="0.01" />
              <Form.Label><h5>Difficulty (0-10 with 10 being most difficult, 0 being you were sleeping):</h5></Form.Label>
              <Form.Control name="rpe" id="rpe" onChange={this.handleChange} type="number" min="0" max="10" placeholder="0-10" step="0.1" />
              <Form.Label><h5>Location (Be as specific as you like):</h5></Form.Label>
              <Form.Control name="location" id="location" onChange={this.handleChange} type="text" placeholder="Great Park, AnyTown" />
              <Form.Label><h5>Any comments on the run:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" placeholder="Some great philosophical findings from this run." />
              <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateRun)
