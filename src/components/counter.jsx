import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {setStartDate, readFromLocalStorage, resetCountPerDay, getCount, resetCountInBox, getCountInBox, resetCost} from '../actions/actions'
import {formatDate, formatCounter, getDateString,
  eachCigareteCost,
  hourlyCost} from '../lib/helpers'
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import { Statistics } from './statistics'
import {CounterText} from './counter_text'

export const Counter = React.createClass({

  componentDidMount() {
    this.props.readFromLocalStorage()
  },

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.cigaretesPerDayCount != this.state.cigaretesPerDayCount)
  //     this.setState({cigaretesPerDayCount: nextProps.cigaretesPerDayCount})
  //   if(nextProps.cigaretesInBox != this.state.cigaretesInBox)
  //     this.setState({cigaretesInBox: nextProps.cigaretesInBox})
  //   if(nextProps.cigaretesBoxCost != this.state.cigaretesBoxCost)
  //     this.setState({cigaretesBoxCost: nextProps.cigaretesBoxCost})
  // },

  updateDate(dateString, { dateMoment, timestamp}) {
    this.props.setDate(timestamp);
  },

  resetCountPerDay(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCountPerDay(value)
  },

  resetCountInBox(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCountInBox(value)
  },

  resetCost(e) {
    let value = 0
    if(e.target.value > 0)
      value = e.target.value
    this.props.resetCost(value)
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

    const {cigaretesBoxCost, cigaretesInBox, cigaretesPerDayCount} = this.props

    const cigareteCost = eachCigareteCost(cigaretesBoxCost, cigaretesInBox)
    const hourCost = hourlyCost(cigaretesBoxCost, cigaretesInBox, cigaretesPerDayCount)

    return (
      <div className="row counter jumbotron">
        <div className="col-md-8">
          <div className="text-center">
            <h3>Quit smoking date {getDateString(this.props.quitDate)}</h3>
            <CounterText quitDate={this.props.quitDate} />
            <h4>Nicely done ! Keep up</h4>
            <div>
              <label>
                How many cigaretes per day you were smoking?
                <input type="number" value={cigaretesPerDayCount} onChange={this.resetCountPerDay} />
              </label>
            </div>
            <div>
              <label>
                How much cigarets is in the box?
                <input type="number" value={cigaretesInBox} onChange={this.resetCountInBox} />
              </label>
            </div>
            <div>
              <label>
                How much pack of cigaretes costs?
                <input type="number" value={cigaretesBoxCost} onChange={this.resetCost} />
              </label>
            </div>
            {this.getDateComponent()}
            <button className="btn btn-lg btn-success" onClick={this.props.start}>Start quitting now!</button>
          </div>
        </div>
        <div className="col-md-4">
          <Statistics
            quitDate={this.props.quitDate}
            cigaretesPerDayCount={this.props.cigaretesPerDayCount}
            cigaretesInBox={this.props.cigaretesInBox}
            cigaretesBoxCost={this.props.cigaretesBoxCost}
            cigareteCost={cigareteCost}
            hourCost={hourCost}
          />
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
