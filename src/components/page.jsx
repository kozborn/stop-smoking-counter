import React from 'react'
import {connect} from 'react-redux';
import { CounterContainer} from './counter'
import { getDateString } from '../lib/helpers'
import { CounterText } from './counter_text'
import { StatisticHeader} from './statistic_header'
import { readFromLocalStorage } from '../actions/actions'

export const Page = React.createClass({

  componentDidMount() {
    this.props.readFromLocalStorage()
  },

  render(){
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <h3 className="text-center">Quit smoking date {getDateString(this.props.quitDate)}</h3>
          <div className="counter-text text-center">
            <CounterText quitDate={this.props.quitDate} />
          </div>
          <StatisticHeader 
            currentStatistic={this.props.currentStatistic}
            quitDate={this.props.quitDate}
            cigarettesPerDayCount={this.props.cigarettesPerDayCount}
            cigarettesInBox={this.props.cigarettesInBox}
            cigarettesBoxCost={this.props.cigarettesBoxCost}
          />
          <CounterContainer 
            currentStatistic={this.props.currentStatistic}
            quitDate={this.props.quitDate}
            cigarettesPerDayCount={this.props.cigarettesPerDayCount}
            cigarettesInBox={this.props.cigarettesInBox}
            cigarettesBoxCost={this.props.cigarettesBoxCost}
          />
        </div>
      </div>
    </div>)
  }

})

const mapStateToProps = (state) => {
  return {
    quitDate: state.get('date'),
    currentStatistic: state.get('currentStatistic'),
    cigarettesPerDayCount: state.get('cigarettesPerDayCount'),
    cigarettesInBox: state.get('cigarettesInBox'),
    cigarettesBoxCost: state.get('cigarettesBoxCost')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    readFromLocalStorage: () => dispatch(readFromLocalStorage())
  }
}


export const PageContainer = connect(mapStateToProps, mapDispatchToProps)(Page);