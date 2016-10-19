import {getDateString, eachCigareteCost, hourlyCost} from '../lib/helpers'
import React from 'react'

const StatisticElement = React.createClass({
  propTypes: {
    label: React.PropTypes.string
  },

  render() {
    return <div className="row" onClick={this.props.onClick}>
      <div className="label text-right col-md-6">{this.props.label}</div>
      <div className="value col-md-6">{this.props.value}</div>
    </div>
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
    return Math.floor((timestamp - this.props.date) / 1000) 
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

  _changeCurrentStatistic(value, e) {
    this.props.changeStatistic(value);
  },

  render() {
    const {date, cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox} = this.props
    const cigareteCost = eachCigareteCost(cigarettesBoxCost, cigarettesInBox)
    const hourCost = hourlyCost(cigarettesBoxCost, cigarettesInBox, cigarettesPerDayCount)
    return(<div className="sidebar-statistic">
      <div>
        <StatisticElement label="Quit date:" value={getDateString(date)} onClick={this._changeCurrentStatistic.bind(this, 'date')}/>
        <StatisticElement label="Cigarettes smoked per day:" value={cigarettesPerDayCount} onClick={this._changeCurrentStatistic.bind(this, 'cigarettesPerDayCount')}/>
        <StatisticElement label="Cigarettes cost:" value= {cigarettesBoxCost} onClick={this._changeCurrentStatistic.bind(this, 'cigarettesBoxCost')} />
        <StatisticElement label="Cigarettes in pack:" value= {cigarettesInBox} onClick={this._changeCurrentStatistic.bind(this, 'cigarettesInBox')}/>
        <StatisticElement label="Single cigarete cost:" value= {parseFloat(cigareteCost).toFixed(4)} onClick={this._changeCurrentStatistic.bind(this, 'cigareteCost')} />
        <StatisticElement label="Single hour cost:" value= {parseFloat(hourCost).toFixed(4)} onClick={this._changeCurrentStatistic.bind(this, 'hourCost')} />
        <StatisticElement label="Seconds elapsed:" value= {this.state.secondsElapsed} onClick={this._changeCurrentStatistic.bind(this, 'secondsElapsed')}/>
        <StatisticElement label="Minutes elapsed:" value= {this.calculateMinutes()} onClick={this._changeCurrentStatistic.bind(this, 'calculateMinutes')}/>
        <StatisticElement label="Hours elapsed:" value= {this.calculateHours()} onClick={this._changeCurrentStatistic.bind(this, 'calculateHours')}/>
        <StatisticElement label="Savings each second:" value= {parseFloat(this.calculateSavingsEachSecond(hourCost)).toFixed(4)}  onClick={this._changeCurrentStatistic.bind(this, 'calculateSavingsEachSecond')}/>
        <StatisticElement label="Already saved:" value= {this.state.alreadySaved} onClick={this._changeCurrentStatistic.bind(this, 'alreadySaved')}/>
      </div>
    </div>
    )
  }
})
