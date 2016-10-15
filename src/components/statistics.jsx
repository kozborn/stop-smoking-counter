import {getDateString, eachCigareteCost, hourlyCost} from '../lib/helpers'
import React from 'react'

const StatisticElement = React.createClass({
  propTypes: {
    label: React.PropTypes.string
  },

  render() {
    return <dl className="dl-horizontal">
      <dt className="text-large label">{this.props.label}</dt>
      <dd className="value">{this.props.value}</dd>
    </dl>
  }
})

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
    let hourCost = null
    this.interval = setInterval(() => {
      let {cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox} = this.props
      hourCost = hourlyCost(cigarettesBoxCost, cigarettesInBox, cigarettesPerDayCount)
      let timestamp = Date.now()
      this.setState({
        secondsElapsed: this.calculateSeconds(timestamp),
        alreadySaved: parseFloat(this.calculateAlreadySaved(timestamp, hourCost)).toFixed(4)
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

  calculateAlreadySaved(timestamp, hourCost){ 
    return this.calculateSeconds(timestamp) * this.calculateSavingsEachSecond(hourCost)
  },

  calculateSavingsEachSecond(hourCost) {
    return hourCost / 3600
  },

  render() {
    const {quitDate, cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox} = this.props
    const cigareteCost = eachCigareteCost(cigarettesBoxCost, cigarettesInBox)
    const hourCost = hourlyCost(cigarettesBoxCost, cigarettesInBox, cigarettesPerDayCount)
    return(<div className="sidebar-statistic">
      <h4>Information about your statistics</h4>
      <div>
        <StatisticElement label="Quit date:" value={getDateString(quitDate)} />
        <StatisticElement label="Cigarettes smoked per day:" value={cigarettesPerDayCount} />
        <StatisticElement label="Cigarettes cost:" value= {cigarettesBoxCost} PLN />
        <StatisticElement label="Cigarettes in pack:" value= {cigarettesInBox} />
        <StatisticElement label="Single cigarete cost:" value= {parseFloat(cigareteCost).toFixed(4)} PLN />
        <StatisticElement label="Single hour cost:" value= {parseFloat(hourCost).toFixed(4)} PLN />
        <StatisticElement label="Seconds elapsed:" value= {this.state.secondsElapsed} />
        <StatisticElement label="Minutes elapsed:" value= {this.calculateMinutes()} />
        <StatisticElement label="Hours elapsed:" value= {this.calculateHours()} />
        <StatisticElement label="Savings each second:" value= {parseFloat(this.calculateSavingsEachSecond(hourCost)).toFixed(4)} />
        <StatisticElement label="Already saved:" value= {this.state.alreadySaved} PLN />
      </div>
    </div>
    )
  }
})
