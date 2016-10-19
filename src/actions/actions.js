const url = "http://piotrkozubek.pl:5984/stop-smoking" 
import {fromJS} from 'immutable'


export function readFromLocalStorage(){
  let date = localStorage.getItem('date') ? localStorage.getItem('date'): Date.now()
  let cigarettesPerDayCount = localStorage.getItem('cigarettesPerDayCount') ? localStorage.getItem('cigarettesPerDayCount'): 0
  let cigarettesInBox = localStorage.getItem('cigarettesInBox') ? localStorage.getItem('cigarettesInBox'): 20
  let cigarettesBoxCost = localStorage.getItem('cigarettesBoxCost') ? localStorage.getItem('cigarettesBoxCost') : 20
  let currentStatistic = localStorage.getItem('currentStatistic') ? localStorage.getItem('currentStatistic') : "secondsElapsed"
  return {
    type: "DATA_CHANGED",
    date: parseInt(date),
    cigarettesPerDayCount: cigarettesPerDayCount,
    cigarettesInBox: cigarettesInBox,
    cigarettesBoxCost: cigarettesBoxCost,
    currentStatistic: currentStatistic
  }
}

export function reset(){
  let date = Date.now();
  localStorage.setItem('date', parseInt(date))
  localStorage.setItem('cigarettesBoxCost', 0)
  localStorage.setItem('cigarettesInBox', 0)
  localStorage.setItem('cigarettesPerDayCount', 0)
  return {
    type: "RESET_DATA"
  }
}

export function setStartDate(timestamp = null){
  let date = timestamp ? timestamp : Date.now();
  localStorage.setItem('date', parseInt(date))
  return {
    type: "UPDATE_DATE",
    date: parseInt(date)
  }
}

export function setCurrentStatistic(currentStatistic = "secondsElapsed"){
  localStorage.setItem('currentStatistic', currentStatistic)
  return {
    type: "SET_CURRENT_STATISTIC",
    currentStatistic: currentStatistic
  }
}

export function getCurrentStatistic(){
  return {
    type: "GET_CURRENT_STATISTIC",
    currentStatistic: localStorage.getItem('currentStatistic') ? localStorage.getItem('currentStatistic') : "secondsElapsed"
  }
}


export function getCost(){
  return {
    type: "CIGARETTES_COST",
    cigarettesBoxCost: localStorage.getItem('cigarettesBoxCost') ? localStorage.getItem('cigarettesBoxCost') : 20
  }
}

export function resetCost(value){
  localStorage.setItem('cigarettesBoxCost', value)
  return {
    type: "CIGARETTES_COST_CHANGED",
    cigarettesBoxCost: value
  }
}

export function getCountInBox(){
  return {
    type: "CIGARETTES_COUNT_IN_BOX",
    cigarettesInBox: localStorage.getItem('cigarettesInBox') ? localStorage.getItem('cigarettesInBox') : 20
  }
}

export function resetCountInBox(value){
  localStorage.setItem('cigarettesInBox', value)
  return {
    type: "CIGARETTES_IN_BOX_CHANGED",
    cigarettesInBox: value
  }
}

export function resetCountPerDay(value){
  localStorage.setItem('cigarettesPerDayCount', value)
  return {
    type: "CIGARETTES_COUNT_CHANGED",
    cigarettesPerDayCount: value
  }
}

export function getCount(){
  return {
    type: "CIGARETTES_COUNT",
    cigarettesPerDayCount: localStorage.getItem('cigarettesPerDayCount') ? localStorage.getItem('cigarettesPerDayCount') : 0
  }
}

export function fetchingStart(){
  return{
    type: "FETCHING_START"
  }
}

export function fetchingStop(){
  return{
    type: "FETCHING_STOP"
  }
}


export function readFromCouchDB(docId){
  return function(dispatch, getState){
    dispatch(fetchingStart())
    fetch(url, docId)
    .done(function( date ) {
      const fetched = fromJS(JSON.parse(date))
      dispatch({
        type: "DATA_CHANGED",
        _id: fetched.get('_id'),
        _rev: fetched.get('_rev'),
        name: fetched.get('name'),
        date: parseInt(fetched.get('date')),
        cigarettesPerDayCount: fetched.get('cigarettesPerDayCount'),
        cigarettesInBox: fetched.get('cigarettesInBox'),
        cigarettesBoxCost: fetched.get('cigarettesBoxCost'),
        currentStatistic: fetched.get('currentStatistic')
      })
      dispatch(fetchingStop())
    })
  }
}

function fetch(url, docId){
  return $.ajax({
    url: url + "/" + docId
  })
}

function saving() {
  return {type: "SAVING"}
}

function saved(response){
  console.log(response)
  return {type: "SAVED"}
}

function error(error){
  console.log(error)
  return {type: "ERROR"}
}

function _save(url, data){
  return $.ajax({
    url: url,
    method: "PUT",
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    data: JSON.stringify(data.toJS())
  })
}

export function save(docId = null, data = null){
  let newUrl = docId ? (url + '/' + docId) : url
  return function(dispatch, getState){
    dispatch(saving())
    let doc = data ? data : getState()
    _save(newUrl, doc)
    .done(function(response){
      return dispatch(saved(response))
    }).fail(function(err){
      if(err.status === 409){
        data = getState()
        fetch(url, docId)
        .done(function(response){
          data = data.set('_rev', JSON.parse(response)._rev)
          dispatch(save(docId, data))
        })
      }
      return dispatch(error(err))
    })
  }
}
