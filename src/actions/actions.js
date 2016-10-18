const url = "http://piotrkozubek.pl:5984/stop-smoking" 
import {fromJS} from 'immutable'

export function changeCounter(number = 1){
  return {
    type: 'CHANGE',
    number
  }
}

export function readFromLocalStorage(){
  let data = localStorage.getItem('smokingStoppedDate') ? localStorage.getItem('smokingStoppedDate'): Date.now()
  let cigarettesPerDayCount = localStorage.getItem('cigarettesPerDayCount') ? localStorage.getItem('cigarettesPerDayCount'): 0
  let cigarettesInBox = localStorage.getItem('cigarettesInBox') ? localStorage.getItem('cigarettesInBox'): 20
  let cigarettesBoxCost = localStorage.getItem('cigarettesBoxCost') ? localStorage.getItem('cigarettesBoxCost') : 20
  let currentStatistic = localStorage.getItem('currentStatistic') ? localStorage.getItem('currentStatistic') : "secondsElapsed"
  return {
    type: "DATA_CHANGED",
    date: parseInt(data),
    cigarettesPerDayCount: cigarettesPerDayCount,
    cigarettesInBox: cigarettesInBox,
    cigarettesBoxCost: cigarettesBoxCost,
    currentStatistic: currentStatistic
  }
}

export function reset(){
  let data = Date.now();
  localStorage.setItem('smokingStoppedDate', parseInt(data))
  localStorage.setItem('cigarettesBoxCost', 0)
  localStorage.setItem('cigarettesInBox', 0)
  localStorage.setItem('cigarettesPerDayCount', 0)
  return {
    type: "RESET_DATA"
  }
}

export function setStartDate(timestamp = null){
  let data = timestamp ? timestamp : Date.now();
  localStorage.setItem('smokingStoppedDate', parseInt(data))
  return {
    type: "DATA_CHANGED",
    date: parseInt(data)
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
    $.ajax({
      url: url + "/" + docId
    })
    .done(function( data ) {
      const fetched = fromJS(JSON.parse(data))
      dispatch({
        type: "DATA_CHANGED",
        docId: fetched.get('_id'),
        rev: fetched.get('rev'),
        name: fetched.get('name'),
        date: parseInt(fetched.get('smokingStoppedDate')),
        cigarettesPerDayCount: fetched.get('cigarettesPerDayCount'),
        cigarettesInBox: fetched.get('cigarettesInBox'),
        cigarettesBoxCost: fetched.get('cigarettesBoxCost'),
        currentStatistic: fetched.get('currentStatistic')
      })
      dispatch(fetchingStop())
    })
  }

}

export function save(docId, data){

}
