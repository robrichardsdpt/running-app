import React from 'react'
import axios from 'axios'
// import styled from 'styled-components'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  componentDidMount () {
    axios.get('https://api.unsplash.com/photos/random/?collections=98358577&client_id=DNXL-N0EmhKnyn8n1Vz9DYomyQCI-xhwfDD5T-o86A0')
      .then(response => {
        console.log(response)
        this.setState({
          image: response.data.urls.regular
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    const theme = {
      display: 'block',
      backgroundImage: `url(${this.state.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '0',
      paddingTop: '66.64%'
    }
    console.log(this.state)
    return (
      <div style={theme}>
      </div>
    )
  }
}

export default Home
