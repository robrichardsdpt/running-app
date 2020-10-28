import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class RunDetail extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      isLoaded: false,
      run: {},
      token: this.props.user.token,
      formShown: false
    } // this.state
  } // constructor

  onEditButtonClick = () => {
    this.setState({ formShown: true })
  }

  handleDelete = () => {
    console.log('hi')
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
          run: response.data.run
        })
      })
      .catch(console.error)
  }

  render () {
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
    console.log(this.state.run)
    // while the runs are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // if no runs
    } else {
      jsx = (
        <div size="4" className="grid">
          <Col className='card-header'>
            {this.state.run.date}
          </Col>
          <Col>
            {this.state.run.location}
          </Col>
          <Col>
            {timeConverted(this.state.run.time)}
          </Col>
          <Col>
            {this.state.run.distance}
          </Col>
          <Col>
            {this.state.run.difficulty}
          </Col>
          <Col>
            {this.state.run.notes}
          </Col>
          <Button variant="primary" type="button" onClick={this.handleDelete}>Delete</Button>
          <Button variant="primary" type="button" onClick={this.onEditButtonClick}> Edit</Button>
          <Link to={'/profile/'}><Button variant="primary">Go Back to Profile</Button></Link>
        </div>
      )
    }
    return (
      <div className='profile'>
        <h2>{this.props.user.email}</h2>
        {jsx}
      </div>
    ) // return
  } // render
}

export default RunDetail
