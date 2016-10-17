const url = "http://piotrkozubek.pl:5984/stop-smoking" 

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
    type: "START_DATE_CHANGED",
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
    type: "START_DATE_CHANGED",
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

export function updateCounter(){
  let sec = 0
  let min = 0
  let hour = 0
  let days = 0
  let months = 0
  let years = 0
}