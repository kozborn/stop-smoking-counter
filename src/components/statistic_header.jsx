import React from 'react'
import {connect} from 'react-redux'
import {getDateString, eachCigareteCost, hourlyCost} from '../lib/helpers'

export const StatisticHeader = React.createClass({

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

  getLabel() {
    switch(this.props.currentStatistic){
      case "secondsElapsed": 
        return 'Seconds Elapsed'
      case "quitDate":
        return 'Quit date'
      case "cigarettesPerDayCount":
        return 'Cigarettes per day count'
      case 'cigarettesBoxCost': 
        return 'Cigarettes pack cost'
      case 'cigarettesInBox': 
        return 'Cigarettes in pack count'
      case 'cigareteCost':
        return "Single cigarette cost"
      case 'hourCost':
        return 'Hourly cost'
      case 'calculateMinutes':
        return 'Minutes elapsed'
      case 'calculateHours':
        return 'Hours elapsed'
      case 'calculateSavingsEachSecond':
        return "Each second you are saving"
      case 'alreadySaved':
        return 'Already saved'
      default:
        return ""
    }
  },

  getValue() {
    const {quitDate, cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox} = this.props
    const cigareteCost = eachCigareteCost(cigarettesBoxCost, cigarettesInBox)
    const hourCost = hourlyCost(cigarettesBoxCost, cigarettesInBox, cigarettesPerDayCount)

    switch(this.props.currentStatistic){
      case "secondsElapsed": 
        return this.state.secondsElapsed + "s"
      case "quitDate":
        return getDateString(quitDate)
      case "cigarettesPerDayCount":
        return cigarettesPerDayCount
      case 'cigarettesBoxCost': 
        return parseFloat(cigarettesBoxCost).toFixed(2)
      case 'cigarettesInBox': 
        return cigarettesInBox
      case 'cigareteCost':
        return parseFloat(cigareteCost).toFixed(4) + " PLN"
      case 'hourCost':
        return hourCost.toFixed(4) + " PLN"
      case 'calculateMinutes':
        return this.calculateMinutes() + "m"
      case 'calculateHours':
        return this.calculateHours() + "h"
      case 'calculateSavingsEachSecond':
        return parseFloat(this.calculateSavingsEachSecond(hourCost)).toFixed(4) + " PLN"
      case 'alreadySaved':
        return parseFloat(this.state.alreadySaved).toFixed(4) + " PLN"
      default:
        return ""
    }
  },

  getHeader() {
    const label = this.getLabel()
    const value = this.getValue()
    return <h1>{label}: <strong>{value}</strong></h1>
  },

  getAlreadySaved(){
    if(this.props.currentStatistic!='alreadySaved'){
      return <div className="already-saved-counter">
         <div>{parseFloat(this.state.alreadySaved).toFixed(4) + " PLN"}</div> 
      </div>
    }else 
    return null;
  },

  render(){
    return (
      <div className="statistic-header text-center">
        {this.getAlreadySaved()}
        {this.getHeader()}
      </div>
    )
  }

})
