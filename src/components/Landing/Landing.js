import React from 'react'
// import { Route } from 'react-router-dom'
import Quote from '../Quote/Quote'
// import styled from 'styled-components'

class Landing extends React.Component {
  render () {
    return (
      <div className="quote-landing">
        <Quote
        />
        <div className="landing-instruction">
          Sign up or sign in to start tracking your runs!
        </div>
      </div>
    )
  }
}

export default Landing
