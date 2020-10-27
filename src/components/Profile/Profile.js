import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

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
    const userRunArray = this.state.userRuns.map(run => {
      return (
        <div key={run._id} size="4" className="grid">
          <Col>
            <Link to={`/run-detail/${run.id}`}>
              {run.date}</Link>
          </Col>
          <Col>
            {run.location}
          </Col>
        </div>
      )
    })

    let jsx
    // while the books are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // if no books
    } else if (this.state.userRuns.length === 0) {
      jsx = <p>No runs, please add one. </p>
      // when the request is complete
    } else {
      jsx = (
        <Container>
          {userRunArray}
        </Container>
      )
    }
    return (
      <div className='profile'>
        <div>
          <h2>{this.props.user.email}</h2>
          <h3>{`${userRunArray.length} posts`}</h3>
        </div>
        {jsx}
      </div>
    )
  } // render
}
export default Profile
