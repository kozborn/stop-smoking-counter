import {Map} from 'immutable';

export function setState(state, newState) {
  return state.merge(newState);
}

export function sum(state, number) {
  return state.set('counter', state.get('counter') + number);
}

export function setDate(state, date) {
  return state.set('quitDate', date)
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'DATA_CHANGED':
      return setState(state, {date: action.date, cigaretesPerDayCount: action.cigaretesPerDayCount})
    case 'CIGARETTES_COUNT_CHANGED':
      return setState(state, {cigaretesPerDayCount: action.cigaretesPerDayCount})
    case 'CHANGE': 
      return sum(state, action.number);
  }
  return state;
}