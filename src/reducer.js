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
    case 'START_DATE_CHANGED':
      return setDate(state, action.date)
    case 'CHANGE': 
      return sum(state, action.number);
  }
  return state;
}