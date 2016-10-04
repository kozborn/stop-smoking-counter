import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {setStartDate, readFromLocalStorage} from '../actions/actions'
import {formatDate} from '../lib/helpers'

export const Welcome = React.createClass({

  componentDidMount() {
    this.props.readFromLocalStorage()
    this.startCounter()
  },

  getInitialState() {
       return {
          counter: '' 
       };
   },

   calculateTime(date) {
      if(!this.props.quitDate)
        return 'Start quitting'
      const secondsElapsed = Math.floor((date - this.props.quitDate) / 1000)
      let days = Math.floor(secondsElapsed / (60 * 60 * 24))
      let hours = Math.floor((secondsElapsed - (days * 24 * 60 * 60)) / (60* 60))  
      let minutes = Math.floor((secondsElapsed - (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60)
      let seconds = Math.floor((secondsElapsed - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)))

      let count = `${days} days, ${hours} hours,  `
      count = `${seconds} seconds without cigarette.`
      if(minutes)
        count = `${minutes} minutes and ` + count
      if(hours)
        count = `${hours} hours ` + count
      if(days)
        count = `${days} days, ` + count
      return count;
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

  render() {
    return (
      <div className="text-center">
        <h2>Quit smoking date {formatDate(this.props.quitDate)}</h2>
        <h3>{this.state.counter}</h3>
        <h3>Nicely done ! Keep up</h3>
        <button className="btn btn-success" onClick={this.props.start}>Reset date</button>
      </div>
    );
  }

})

const mapStateToProps = (state) => {
  return {
    message: state.getIn(['message']),
    quitDate: state.get('quitDate')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => {
      dispatch(setStartDate());
    },
    readFromLocalStorage: () => dispatch(readFromLocalStorage())
  }
}

export const  WelcomeContainer = connect(mapStateToProps, mapDispatchToProps)(Welcome);
