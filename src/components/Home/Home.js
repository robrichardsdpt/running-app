import React from 'react'
import axios from 'axios'
// import styled from 'styled-components'
import Quote from '../Quote/Quote'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  // api call to get random image from Unsplash API
  componentDidMount () {
    axios.get('https://api.unsplash.com/photos/random/?collections=98358577&client_id=DNXL-N0EmhKnyn8n1Vz9DYomyQCI-xhwfDD5T-o86A0')
      .then(response => {
        this.setState({
          image: response.data.urls.regular
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    const theme = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${this.state.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '0',
      paddingTop: '66.64%'
    }
    return (
      <div>
        <div style={theme}>
        </div>
        <div className="quote">
          <Quote/>
        </div>
      </div>
    )
  }
}

export default Home
