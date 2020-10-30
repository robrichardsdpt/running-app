import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter, Link, Route } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Banner from '../Home/Banner'

class RunDetail extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      // conditions for loading of files and redirects
      isLoaded: false,
      isUpdated: false,
      isDeleted: false,
      run: {},
      token: this.props.user.token,
      totalTimeInSeconds: 0,
      timeFormatted: '',
      dateFormatted: '',
      id: this.props.id
    } // this.state
  } // constructor

  // on update field for time, converts user input into back end appropriate data.
  handleTimeChange = (event) => {
    const timeArray = event.target.value.split(':')
    console.log(timeArray)
    if (timeArray.length === 3) {
      const hours = parseInt(timeArray[0])
      const minutes = parseInt(timeArray[1])
      const seconds = parseInt(timeArray[2])
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds
      console.log(totalSeconds)
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      if (runCopy.distance && runCopy.time) {
        const pace = this.averagePace(runCopy.distance, runCopy.time)
        const speed = this.averageSpeed(runCopy.distance, runCopy.time)
        runCopy['average_pace'] = pace
        runCopy['average_spd'] = speed
      }
      this.setState({
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
        run: runCopy
      })
      return (totalSeconds)
    } else {
      console.error('put the appropriate amount of data')
    }
  }

  // calculates the average pace for the run and converts into user friendly time format of HH:MM:SS
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

  // Calculates the average speed for the run
  averageSpeed = (distance, time) => {
    const runSpeed = (distance * 3600) / (time)
    return parseFloat(runSpeed).toFixed(2)
  }

  // Handles all other form changes
  handleChange = (event) => {
    const formattedTime = this.state.totalTimeInSeconds
    const runKey = event.target.name
    console.log(formattedTime)
    const userInput = event.target.value
    // get the name of the input that the user typed in
    // make a copy of the state
    const runCopy = Object.assign({}, this.state.run) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    runCopy[runKey] = userInput
    console.log(runCopy)
    if (runCopy.distance && runCopy.time) {
      const pace = this.averagePace(runCopy.distance, runCopy.time)
      const speed = this.averageSpeed(runCopy.distance, runCopy.time)
      runCopy['average_pace'] = pace
      runCopy['average_spd'] = speed
    }
    // updating the state with our new copy
    console.log(runCopy)
    this.setState({ run: runCopy
    })
    console.log(runCopy)
  }

  // The edit submit and patch request
  onEditButtonClick = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const run = this.state.run
    axios({
      url: `${apiUrl}/runs/${this.props.id}/`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        run: run
      }
    })
      .then((response) => this.setState({
        isUpdated: true
      })
      )
      .then(() => msgAlert({
        heading: 'Changes Created With Success!',
        message: messages.uploadRunSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload your changes, failed with error: ' + error.messages,
          message: messages.uploadRunFailure,
          variant: 'danger'
        })
      })
  }

  // delete request
  handleDelete = () => {
    const { msgAlert, history } = this.props
    const userId = this.state.id
    axios({
      url: `${apiUrl}/runs/${userId}/`,
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      }
    })
      .then(response => this.setState({
        userRunId: this.state.createdRunId,
        isUpdated: true }))
      .then(() => msgAlert({
        heading: 'Successfully Deleted a Run',
        message: messages.deleteRunSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not delete the run, failed with error: ' + error.messages,
          message: messages.deleteRunFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  // show request
  componentDidMount () {
    axios({
      url: `${apiUrl}/runs/${this.props.id}/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          run: response.data.run,
          timeFormatted: response.data.run.time
        })
      })
      .catch(console.error)
  }

  render () {
    // redirects if updated or delete, which bring you back to the updated profile page
    if (this.state.isUpdated) {
      return <Redirect to ={'/profile'} />
    }
    if (this.state.isDeleted) {
      return <Redirect to ={'/profile'} />
    }
    // converts the time to object for presentation to the user
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
    let jsx
    // while the runs are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // if no runs
    } else {
      jsx = (
        <div size="4" className="grid">
          <Form onSubmit={this.handleSubmit} >
            <Col className='card-header'>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                name="date"
                id="date"
                type="date"
                value={this.state.run.date}
                onChange={ this.handleChange}
              />
            </Col>
            <Col>
              <Form.Label><h5>Location (be as specific as you like):</h5></Form.Label>
              <Form.Control name="location" id="location" onChange={this.handleChange} type="text" value={this.state.run.location} />
            </Col>
            <Col>
              <Form.Label><h5>Time taken (total seconds): </h5></Form.Label>
              <Form.Control name="time" id="time" onChange={this.handleTimeChange} type="text" placeholder={timeConverted(this.state.run.time)} min="0"/>
            </Col>
            <Col>
              <Form.Label><h5>Distance (miles):</h5></Form.Label>
              <Form.Control name="distance" id="distance" onChange={this.handleChange} type="number" value={this.state.run.distance} min="0" step="0.01"/>
            </Col>
            <Col>
              <h5>Average pace:   {this.state.run.average_pace} </h5>
              <br/>
            </Col>
            <Col>
              <h5>Average speed:   {this.state.run.average_spd} mph </h5>
              <br/>
            </Col>
            <Col>
              <Form.Label><h5>Difficulty(0-10 with 10 being most difficult, 0 being you were sleeping):</h5></Form.Label>
              <Form.Control name="rpe" id="rpe" onChange={this.handleChange} type="number" value={this.state.run.rpe} min="0" max="10" step="0.1" />
            </Col>
            <Col className='card-form'>
              <Form.Label><h5>Any comments on the run:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" value={this.state.run.notes} />
            </Col>
            <Col className='card-form'>
              <Button variant="primary" type="button" onClick={this.handleDelete}>Delete</Button>
              <Button variant="primary" type="submit" onClick={this.onEditButtonClick}> Edit</Button>
              <Link to={'/profile/'}><Button variant="primary">Go Back to Profile</Button></Link>
            </Col>
          </Form>
        </div>
      )
    }
    return (
      <div>
        <h1 className='user-name'>{this.props.user.email}</h1>
        {jsx}
        <div className='run-detail'>
          <Route render={() => (
            <Banner/>
          )}
          />
        </div>
      </div>
    ) // return
  } // render
}

export default withRouter(RunDetail)
