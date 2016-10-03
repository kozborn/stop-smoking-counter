import {expect} from 'chai';
import {Map} from 'immutable'
import {sum} from '../src/reducer'

describe('Reducer', () => {
  it('should correctly add number', () => {
    let state = Map()
    state = state.set('counter', 0);
    const nextState = sum(state, 1)
    const nextState2 = sum(nextState, -2)
    expect(state.get('counter')).to.equal(0)
    expect(nextState.get('counter')).to.equal(1)
    expect(nextState2.get('counter')).to.equal(-1)
  })
})