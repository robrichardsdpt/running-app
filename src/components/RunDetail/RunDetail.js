import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter, Link, Route } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Home from '../Home/Home'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import moment from 'moment'

class RunDetail extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      run: {},
      token: this.props.user.token,
      totalTimeInSeconds: 0,
      timeFormatted: '',
      dateFormatted: '',
      createdUserImageId: null,
      id: this.props.id
    } // this.state
  } // constructor

  // handleDateChange = (date) => {
  //   console.log(date)
  //   this.setState({
  //     newDate: date
  //   })
  //   const formattedDate = moment(date).format('YYYY-MM-DD')
  //   console.log(this.state.newDate)
  //   this.setState({
  //     formattedDate: formattedDate
  //   })
  //   const runCopy = Object.assign({}, this.state.run)
  //   runCopy['date'] = formattedDate
  //   console.log(runCopy)
  // }

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
      // this.setState({
      //   totalTimeInSeconds: totalSeconds,
      //   timeFormatted: event.target.value
      // })
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
      console.log(totalSeconds)
      // const runCopy = Object.assign({}, this.state.run)
      // runCopy['time'] = totalSeconds
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      // this.setState({
      //   totalTimeInSeconds: totalSeconds,
      //   timeFormatted: event.target.value
      // })
      if (runCopy.distance && runCopy.time) {
        const pace = this.averagePace(runCopy.distance, runCopy.time)
        const speed = this.averageSpeed(runCopy.distance, runCopy.time)
        runCopy['average_pace'] = pace
        runCopy['average_spd'] = speed
      }
      this.setState({
        run: runCopy
      })
      // return (totalSeconds)
    } else if (timeArray.length === 1) {
      const totalSeconds = parseInt(timeArray[0])
      console.log(totalSeconds)
      const runCopy = Object.assign({}, this.state.run)
      runCopy['time'] = totalSeconds
      // this.setState({
      //   totalTimeInSeconds: totalSeconds,
      //   timeFormatted: event.target.value
      // })
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
      console.log('put the appropriate amount of data')
    }
    console.log('i made it into the time change')
  }
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
  averageSpeed = (distance, time) => {
    const runSpeed = (distance * 3600) / (time)
    return parseFloat(runSpeed).toFixed(2)
  }

  handleChange = (event) => {
    // const formattedDate = moment(this.state.newDate).format('YYYY-MM-DD')
    const formattedTime = this.state.totalTimeInSeconds
    // if (runKey === 'date') {
    //   this.handleDateChange(event)
    // }
    const runKey = event.target.name
    // if (runKey === 'time') {
    //   const timeIsInSeconds = this.handleTimeChange(event)
    //   this.setState({ totalTimeInSeconds: timeIsInSeconds })
    //   console.log(this.state.totalTimeInSeconds, timeIsInSeconds)
    // }
    // const formattedTime = this.state.run.time
    // get the value that the user typed in
    console.log(formattedTime)
    const userInput = event.target.value
    // get the name of the input that the user typed in
    // make a copy of the state
    const runCopy = Object.assign({}, this.state.run) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    runCopy[runKey] = userInput
    // runCopy['date'] = formattedDate
    // runCopy['time'] = formattedTime
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

  onEditButtonClick = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const run = this.state.run
    // const userImage = this.state.userImage
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
        this.setState({ run: {
          date: '',
          time: '',
          distance: '',
          average_pace: '',
          average_spd: '',
          notes: '',
          rpe: '',
          location: '',
          owner: ''
        } })
        msgAlert({
          heading: 'Could not upload your changes, failed with error: ' + error.messages,
          message: messages.uploadRunFailure,
          variant: 'danger'
        })
      })
  }

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
      .then(response => this.setState({ userRunId: this.state.createdRunId }))
      .then(() => msgAlert({
        heading: 'Successfully Deleted a Run',
        message: messages.deleteRunSuccess,
        variant: 'success'
      }))
      .then(history.push('/profile'))
      .catch(error => {
        this.setState({ run: {
          date: null,
          time: '',
          distance: '',
          average_pace: '',
          average_spd: '',
          notes: '',
          rpe: '',
          location: '',
          owner: ''
        } })
        msgAlert({
          heading: 'Could not delete the run, failed with error: ' + error.messages,
          message: messages.deleteRunFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

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
    if (this.state.isUpdated) {
      return <Redirect to ={'/profile'} />
    }
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
    console.log(timeConverted(this.state.timeFormatted))
    // const convertedTime = timeConverted(this.state.run.time)
    // this.setState({ timeFormatted: convertedTime })
    let jsx
    console.log(this.state.run.time)
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
              <Form.Label>Location (be as specific as you like):</Form.Label>
              <Form.Control name="location" id="location" onChange={this.handleChange} type="text" value={this.state.run.location} />
            </Col>
            <Col>
              <Form.Label>Time taken (total seconds): Time in HH:MM:SS = {timeConverted(this.state.run.time)}<br/>
              ***Please input in total seconds (site will calculate in HH:MM:SS)***</Form.Label>
              <Form.Control name="time" id="time" onChange={this.handleTimeChange} type="text" placeholder={timeConverted(this.state.run.time)} min="0"/>
            </Col>
            <Col>
              <Form.Label>Distance (miles):</Form.Label>
              <Form.Control name="distance" id="distance" onChange={this.handleChange} type="number" value={this.state.run.distance} min="0"/>
            </Col>
            <Col>
              Average pace:  {this.state.run.average_pace}
            </Col>
            <Col>
              Average speed:  {this.state.run.average_spd} mph
            </Col>
            <Col>
              <Form.Label>Difficulty(0-10 with 10 being most difficult, 0 being you were sleeping):</Form.Label>
              <Form.Control name="rpe" id="rpe" onChange={this.handleChange} type="number" value={this.state.run.rpe} min="0" max="10" />
            </Col>
            <Col className='card-form'>
              <Form.Label>Any comments on the run:</Form.Label>
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
      <div className='profile'>
        <h2 className='user-name'>{this.props.user.email}</h2>
        {jsx}
        <Route render={() => (
          <Home/>
        )}
        />
      </div>
    ) // return
  } // render
}

export default withRouter(RunDetail)
