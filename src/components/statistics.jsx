import {getDateString} from '../lib/helpers'
import React from 'react'

export const Statistics = React.createClass({

  getInitialState() {
    return{
      secondsElapsed: 0 
    }
  },

  componentDidMount() {
    this.startCounter()
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  startCounter() {
    this.interval = setInterval(() => {
      let timestamp = Date.now()
      this.setState({
        secondsElapsed: this.calculateSeconds(timestamp),
        alreadySaved: parseFloat(this.calculateAlreadySaved(timestamp)).toFixed(4)
      })
    }, 1000)
  },

  calculateSeconds(timestamp) {
    return Math.floor((timestamp - this.props.quitDate) / 1000)
  },

  calculateMinutes() {
    return parseInt(this.state.secondsElapsed/60)
  },

  calculateHours() {
    return parseInt(this.state.secondsElapsed/60/60)
  },

  calculateAlreadySaved(timestamp){
    return this.calculateSeconds(timestamp) * this.calculateSavingsEachSecond()
  },

  calculateSavingsEachSecond() {
    return this.props.hourCost / 3600
  },

  render() {
    const {quitDate, cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox, cigareteCost, hourCost} = this.props
    
    return(<div>
      <h4>Information about your statistics</h4>
      <div>
        <div>Quit date: {getDateString(quitDate)}</div>
        <div>Cigarettes smoked per day: {cigarettesPerDayCount}</div>
        <div>Cigarettes cost: {cigarettesBoxCost} PLN</div>
        <div>Cigarettes in pack: {cigarettesInBox}</div>
        <div>Single cigarete cost: {parseFloat(cigareteCost).toFixed(4)} PLN</div>
        <div>Single hour cost: {parseFloat(hourCost).toFixed(4)} PLN</div>
        <div>Seconds elapsed: {this.state.secondsElapsed}</div>
        <div>Minutes elapsed: {this.calculateMinutes()}</div>
        <div>Hours elapsed: {this.calculateHours()}</div>
        <div>Savings each second: {parseFloat(this.calculateSavingsEachSecond()).toFixed(4)}</div>
        <div>Already saved: {this.state.alreadySaved} PLN</div>
      </div>
    </div>
    )
  }
})
