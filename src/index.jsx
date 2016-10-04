import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router'
import App from './app'
import {CounterContainer} from './components/counter'
import {changeCounter} from './actions/actions'

require("bootstrap-webpack!./bootstrap.config.js");

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

require('./styles/stylus.styl')

const store = createStore(reducer, applyMiddleware(logger, crashReporter));
store.dispatch({
  type: 'SET_STATE',
  state: {
    message: "Welcome in As Simple As Possible",
    quitDate: null
  }
});

const routes = <Route component={App}>
  <Route path="/" component={CounterContainer} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
	  <Router history={hashHistory}>{routes}</Router>
	</Provider>,
  document.getElementById('app')
);