import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {setStartDate, readFromLocalStorage, resetCountPerDay, getCount, resetCountInBox, getCountInBox, resetCost} from '../actions/actions'
import {formatDate, formatCounter} from '../lib/helpers'
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import { Statistics } from './statistics'


export const Counter = React.createClass({

  componentDidMount() {
    this.props.readFromLocalStorage()
    this.startCounter()
  },

  getInitialState() {
    return {
      counter: '',
      cigarettesCount: 0
    };
  },

  calculateTime(date) {
    if(!this.props.quitDate)
      return 'Start quitting'
    const secondsElapsed = Math.floor((date - this.props.quitDate) / 1000)
    return formatCounter(secondsElapsed)
 },

  startCounter() {
    let timestamp = this.props.quitDate

    this.interval = setInterval(() => {
     this.setState({counter: this.calculateTime(Date.now())})
    }, 1000)
    return timestamp
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  resetCountPerDay(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCountPerDay(value)
    this.setState({cigaretesPerDayCount: value})
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.cigaretesPerDayCount != this.state.cigaretesPerDayCount)
      this.setState({cigaretesPerDayCount: nextProps.cigaretesPerDayCount})
    if(nextProps.cigaretesInBox != this.state.cigaretesInBox)
      this.setState({cigaretesInBox: nextProps.cigaretesInBox})
    if(nextProps.cigaretesBoxCost != this.state.cigaretesBoxCost)
      this.setState({cigaretesBoxCost: nextProps.cigaretesBoxCost})
  },

  updateDate(dateString, { dateMoment, timestamp}) {
    this.props.setDate(timestamp);
  },

  resetCountInBox(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCountInBox(value)
    this.setState({cigaretesInBox: value})
  },

  resetCost(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCost(value)
    this.setState({cigaretesBoxCost: value})
  },

  getDateComponent(){
    if(this.props.quitDate){
      return (<div>
          <label>
            Change your quit date
            <DateField
              dateFormat="YYYY-MM-DD HH:mm:ss"
              forceValidDate={true}
              defaultValue={this.props.quitDate}
              >
              <TransitionView>
                <Calendar onChange={this.updateDate} />
              </TransitionView>
            </DateField>
          </label>
        </div>
      )
    }
    else return null
  },

  render() {
    return (
      <div className="row counter jumbotron">
        <div className="col-md-8">
          <div className="text-center">
            <h3>Quit smoking date {formatDate(this.props.quitDate)}</h3>
            <h3>{this.state.counter}</h3>
            <h4>Nicely done ! Keep up</h4>
            <div>
              <label>
                How many cigaretes per day you were smoking?
                <input type="number" value={this.state.cigaretesPerDayCount} onChange={this.resetCountPerDay} />
              </label>
            </div>
            <div>
              <label>
                How much cigarets is in the box?
                <input type="number" value={this.state.cigaretesInBox} onChange={this.resetCountInBox} />
              </label>
            </div>
            <div>
              <label>
                How much pack of cigaretes costs?
                <input type="number" value={this.state.cigaretesBoxCost} onChange={this.resetCost} />
              </label>
            </div>
            {this.getDateComponent()}
            <button className="btn btn-lg btn-success" onClick={this.props.start}>Start quitting now!</button>
          </div>
        </div>
        <div className="col-md-4">
          <Statistics />
        </div>
      </div>
    );
  }

})

const mapStateToProps = (state) => {
  return {
    message: state.getIn(['message']),
    quitDate: state.get('date'),
    cigaretesPerDayCount: state.get('cigaretesPerDayCount'),
    cigaretesInBox: state.get('cigaretesInBox'),
    cigaretesBoxCost: state.get('cigaretesBoxCost')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => {
      dispatch(setStartDate());
    },
    setDate: (timestamp) => {
      dispatch(setStartDate(timestamp))
    },
    readFromLocalStorage: () => dispatch(readFromLocalStorage()),
    resetCountPerDay: (value) => dispatch(resetCountPerDay(value)),
    resetCountInBox: (value) => dispatch(resetCountInBox(value)),
    resetCost: (value) => dispatch(resetCost(value))
  }
}

export const  CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);
