import React from 'react'
import {connect} from 'react-redux';
import { CounterContainer} from './counter'
import { CounterText } from './counter_text'
import { StatisticHeader} from './statistic_header'
import { readFromLocalStorage, readFromCouchDB, save} from '../actions/actions'

export const Page = React.createClass({

  componentDidMount() {
    if(this.props.params && this.props.params.docId)
      this.props.readFromCouchDB(this.props.params.docId)
    else
      this.props.readFromLocalStorage()
  },

  getWelcomeUserText(){
     return this.props.name ? <h2>Hi {this.props.name}</h2> : null
  },

  save(){
    let docId = this.props.params && this.props.params.docId ? this.props.params.docId : null
    this.props.save(docId);
  },

  render(){
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="counter-text text-center">
            {this.getWelcomeUserText()}
            <CounterText date={this.props.date} />
          </div>
          <StatisticHeader 
            currentStatistic={this.props.currentStatistic}
            date={this.props.date}
            cigarettesPerDayCount={this.props.cigarettesPerDayCount}
            cigarettesInBox={this.props.cigarettesInBox}
            cigarettesBoxCost={this.props.cigarettesBoxCost}
          />
          <CounterContainer 
            currentStatistic={this.props.currentStatistic}
            date={this.props.date}
            cigarettesPerDayCount={this.props.cigarettesPerDayCount}
            cigarettesInBox={this.props.cigarettesInBox}
            cigarettesBoxCost={this.props.cigarettesBoxCost}
          />
          <button className="btn btn-large" onClick={this.save}> Save data </button>
        </div>
      </div>
    </div>)
  }

})

const mapStateToProps = (state) => {
  return {
    name: state.get('name'),
    date: state.get('date'),
    currentStatistic: state.get('currentStatistic'),
    cigarettesPerDayCount: state.get('cigarettesPerDayCount'),
    cigarettesInBox: state.get('cigarettesInBox'),
    cigarettesBoxCost: state.get('cigarettesBoxCost')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    readFromLocalStorage: () => dispatch(readFromLocalStorage()),
    readFromCouchDB: (docId) => dispatch(readFromCouchDB(docId)),
    save: (docId) => dispatch(save(docId))
  }
}


export const PageContainer = connect(mapStateToProps, mapDispatchToProps)(Page);