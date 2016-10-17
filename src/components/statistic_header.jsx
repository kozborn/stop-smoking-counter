import React from 'react'
import {connect} from 'react-redux'

export const StatisticHeader = React.createClass({

  render(){
    return (
      <div className="statistic-header">
        <h1>{this.props.currentStatistic}</h1>
      </div>
    )
  }

})
