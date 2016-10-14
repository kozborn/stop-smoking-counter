import {getDateString, eachCigareteCost, hourlyCost} from '../lib/helpers'
import React from 'react'

export const Statistics = React.createClass({

  render() {
    const {quitDate, cigaretesPerDayCount, cigaretesBoxCost, cigaretesInBox, cigareteCost, hourCost} = this.props
    
    return(<div>
      <h4>Handeful information about your statistics</h4>
      <ul>
        <li>Quit date: {getDateString(quitDate)}</li>
        <li>Cigaretes smoked per day: {cigaretesPerDayCount}</li>
        <li>Cigaretes cost {cigaretesBoxCost}</li>
        <li>Cigaretes in pack {cigaretesInBox}</li>
        <li>Single cigarete cost {cigareteCost}</li>
        <li>Single hour cost {hourCost}</li>
      </ul>
    </div>
    )
  }
})
