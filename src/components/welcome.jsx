import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux';
import {setStartDate, readFromLocalStorage} from '../actions/actions'
import {formatDate} from '../lib/helpers'

export const Welcome = React.createClass({

  componentDidMount() {
    this.props.readFromLocalStorage()  
  },

  render() {
    return (
      <div>
        <h2>{this.props.message}</h2>
        <h3>{formatDate(this.props.quitDate)}</h3>
        <button onClick={this.props.start}>Start</button>
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
