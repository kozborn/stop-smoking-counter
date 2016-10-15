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
    case 'RESET_DATA': 
      return setState(state, {
        date: Date.now(), 
        cigarettesPerDayCount: 0,
        cigarettesInBox: 0,
        cigarettesBoxCost: 0
      })
    case 'SET_STATE':
      return setState(state, action.state);
    case 'START_DATE_CHANGED':
      return setState(state, {
        date: action.date, 
        cigarettesPerDayCount: action.cigarettesPerDayCount,
        cigarettesInBox: action.cigarettesInBox,
        cigarettesBoxCost: action.cigarettesBoxCost
      })
    case 'CIGARETTES_COST_CHANGED':
      return setState(state, {cigarettesBoxCost: action.cigarettesBoxCost})
    case 'CIGARETTES_IN_BOX_CHANGED':
      return setState(state, {cigarettesInBox: action.cigarettesInBox})
    case 'CIGARETTES_COUNT_CHANGED':
      return setState(state, {cigarettesPerDayCount: action.cigarettesPerDayCount})
    case 'CHANGE': 
      return sum(state, action.number);
  }
  return state;
}