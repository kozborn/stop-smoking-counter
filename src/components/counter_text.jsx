import React from 'react'
import {formatCounter, formatCounter2} from '../lib/helpers'

export const CounterText = React.createClass({

  getInitialState() {
    return {
      counter: "" 
    };
  },

  propTypes: {
    quitDate: React.PropTypes.number
  },

  startCounter() {
    let timestamp = this.props.quitDate
    this.interval = setInterval(() => {
     this.setState({counter: this.calculateTime(Date.now())})
    }, 1000)
    return timestamp
  },

  calculateTime(date) {
    if(!this.props.quitDate)
      return 'Start quitting'
    const secondsElapsed = Math.floor((date - this.props.quitDate) / 1000)
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
        <h3>{this.state.counter}</h3>
      </div>
    )

  }
})