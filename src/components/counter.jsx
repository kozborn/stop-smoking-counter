import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {reset, setStartDate, readFromLocalStorage, resetCountPerDay, getCount, resetCountInBox, getCountInBox, resetCost, setCurrentStatistic} from '../actions/actions'
import {formatDate, formatCounter, getDateString} from '../lib/helpers'
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import { Statistics } from './statistics'

export const Counter = React.createClass({

  getInitialState() {
     return {
        cigarettesBoxCost: 0,
        cigarettesInBox: 0,
        cigarettesPerDayCount: 0
      }
  },

  updateDate(dateString, { dateMoment, timestamp}) {
    this.props.setDate(timestamp);
  },

  resetCountPerDay(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.setState({cigarettesPerDayCount: value})
    this.props.resetCountPerDay(value)
  },

  resetCountInBox(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.setState({cigarettesInBox: value})
    this.props.resetCountInBox(value)
  },

  resetCost(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.setState({cigarettesBoxCost: value})
    this.props.resetCost(value)
  },

  getDateComponent(){
    if(this.props.quitDate){
      return (<div className="form-item row">
          <label className="col-md-6 text-right">
            Change your quit date
          </label>
          <div className="col-md-6">
            <DateField
              dateFormat="YYYY-MM-DD HH:mm:ss"
              forceValidDate={true}
              defaultValue={this.props.quitDate}
              >
              <TransitionView>
                <Calendar onChange={this.updateDate} />
              </TransitionView>
            </DateField>
          </div>
        </div>
      )
    }
    else return null
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      cigarettesBoxCost: nextProps.cigarettesBoxCost,
      cigarettesInBox: nextProps.cigarettesInBox,
      cigarettesPerDayCount: nextProps.cigarettesPerDayCount
    })
  },

  _formItem(label, value, onChangeCb){
    return (<div className="form-item row">
              <label className="col-md-6 text-right">
                {label}
              </label>
              <div className="col-md-6">
                <input className="form-control"type="number" value={value} onChange={onChangeCb} />
              </div>
            </div>
  )},

  changeCurrentStatistic(value){
    this.props.setCurrentStatistic(value);
  },

  render() {

    const {cigarettesBoxCost, cigarettesInBox, cigarettesPerDayCount} = this.props
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-8">
                <div className="information-form">
                  {this._formItem("How many cigarettes per day you were smoking?", this.state.cigarettesPerDayCount, this.resetCountPerDay)}
                  {this._formItem("How much cigarettes is in the box?", this.state.cigarettesInBox, this.resetCountInBox)}
                  {this._formItem("How much pack of cigarettes costs?", this.state.cigarettesBoxCost, this.resetCost)}
                  {this.getDateComponent()}
                <div className="text-center button-row">
                  <button className="btn btn-lg btn-success" onClick={this.props.reset}>Start quitting now!</button>
                </div>
                </div>
              </div>
              <div className="col-md-4">
                <Statistics
                  quitDate={this.props.quitDate}
                  cigarettesPerDayCount={this.props.cigarettesPerDayCount}
                  cigarettesInBox={this.props.cigarettesInBox}
                  cigarettesBoxCost={this.props.cigarettesBoxCost}
                  changeStatistic={this.changeCurrentStatistic}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

})

const mapStateToProps = (state) => {
  return {
    message: state.getIn(['message'])
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(reset()),
    setDate: (timestamp) => {
      dispatch(setStartDate(timestamp))
    },
    readFromLocalStorage: () => dispatch(readFromLocalStorage()),
    resetCountPerDay: (value) => dispatch(resetCountPerDay(value)),
    resetCountInBox: (value) => dispatch(resetCountInBox(value)),
    resetCost: (value) => dispatch(resetCost(value)),
    setCurrentStatistic: (value) => dispatch(setCurrentStatistic(value))
  }
}

export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);
