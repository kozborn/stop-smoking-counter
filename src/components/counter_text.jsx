import React from 'react'
import {formatCounter, formatCounter2} from '../lib/helpers'

export const CounterText = React.createClass({

  getInitialState() {
    return {
      counter: "" 
    };
  },

  propTypes: {
    date: React.PropTypes.number
  },

  startCounter() {
    let timestamp = this.props.date
    this.interval = setInterval(() => {
     this.setState({counter: this.calculateTime(Date.now())})
    }, 1000)
    return timestamp
  },

  calculateTime(date) {
    if(!this.props.date)
      return 'Start quitting'
    const secondsElapsed = Math.floor((date - this.props.date) / 1000)
    return formatCounter2(secondsElapsed)
  },

  componentDidMount() {
    this.startCounter()
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  render(){
    return (
      <div>
        <h1>{this.state.counter}</h1>
      </div>
    )

  }
})