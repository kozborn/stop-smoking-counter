import React from 'react'
import {connect} from 'react-redux';
import {CounterContainer} from './counter'
import {getDateString} from '../lib/helpers'
import { CounterText } from './counter_text'

export const Page = React.createClass({

  render(){
    return (<div className="fluid-container">
      <div className="row">
        <div className="col-lg-12">
          <h3 className="text-center">Quit smoking date {getDateString(this.props.quitDate)}</h3>
          <div className="counter-text text-center">
            <CounterText quitDate={this.props.quitDate} />
          </div>
          <CounterContainer />
        </div>
      </div>
    </div>)
  }

})

const mapStateToProps = (state) => {
  return {
    quitDate: state.get('date')
  };
}

export const PageContainer = connect(mapStateToProps)(Page);