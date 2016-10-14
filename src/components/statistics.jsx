import {getDateString} from '../lib/helpers'
import React from 'react'

export const Statistics = React.createClass({

  render() {
    const {quitDate, cigarettesPerDayCount, cigarettesBoxCost, cigarettesInBox, cigareteCost, hourCost} = this.props
    
    return(<div>
      <h4>Handeful information about your statistics</h4>
      <div>
        <div>Quit date: {getDateString(quitDate)}</div>
        <div>cigarettes smoked per day: {cigarettesPerDayCount}</div>
        <div>cigarettes cost {cigarettesBoxCost}</div>
        <div>cigarettes in pack {cigarettesInBox}</div>
        <div>Single cigarete cost {parseFloat(cigareteCost).toFixed(4)}</div>
        <div>Single hour cost {parseFloat(hourCost).toFixed(4)}</div>
      </div>
    </div>
    )
  }
})
