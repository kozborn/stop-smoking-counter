import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {setStartDate, readFromLocalStorage, resetCount, getCount} from '../actions/actions'
import {formatDate, formatCounter} from '../lib/helpers'

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

  resetCount(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCount(value)
    this.setState({cigarettesCount: value})
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.cigarettesCount != this.state.cigarettesCount)
      this.setState({cigarettesCount: nextProps.cigarettesCount})
  },

  render() {
    return (
      <div className="jumbotron text-center">
        <h2>Quit smoking date {formatDate(this.props.quitDate)}</h2>
        <h2>{this.state.counter}</h2>
        <h3>Nicely done ! Keep up</h3>
        <div>
          <label>
            How many cigaretes per day you were smoking?
            <input type="number" value={this.state.cigarettesCount} onChange={this.resetCount} />
          </label>
        </div>
        <button className="btn btn-lg btn-success" onClick={this.props.start}>Reset date</button>
      </div>
    );
  }

})

const mapStateToProps = (state) => {
  return {
    message: state.getIn(['message']),
    quitDate: state.get('date'),
    cigarettesCount: state.get('cigaretesPerDayCount')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => {
      dispatch(setStartDate());
    },
    readFromLocalStorage: () => dispatch(readFromLocalStorage()),
    resetCount: (value) => dispatch(resetCount(value))
  }
}

export const  CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);
