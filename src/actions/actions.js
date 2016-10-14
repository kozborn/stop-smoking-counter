export function changeCounter(number = 1){
  return {
    type: 'CHANGE',
    number
  }
}

export function readFromLocalStorage(){
  let data = localStorage.getItem('smokingStoppedDate') ? localStorage.getItem('smokingStoppedDate'): Date.now()
  let cigaretesPerDayCount = localStorage.getItem('cigaretesPerDayCount') ? localStorage.getItem('cigaretesPerDayCount'): 0
  let cigaretesInBox = localStorage.getItem('cigaretesInBox') ? localStorage.getItem('cigaretesInBox'): 20
  let cigaretesBoxCost = localStorage.getItem('cigaretesBoxCost') ? localStorage.getItem('cigaretesBoxCost') : 20
  return {
    type: "START_DATE_CHANGED",
    date: parseInt(data),
    cigaretesPerDayCount: cigaretesPerDayCount,
    cigaretesInBox: cigaretesInBox,
    cigaretesBoxCost: cigaretesBoxCost
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

export function getCost(value){
  return {
    type: "CIGARETTES_COST",
    cigaretesBoxCost: localStorage.getItem('cigaretesBoxCost') ? localStorage.getItem('cigaretesBoxCost') : 20
  }
}

export function resetCost(value){
  localStorage.setItem('cigaretesBoxCost', value)
  return {
    type: "CIGARETTES_COST_CHANGED",
    cigaretesInBox: value
  }
}

export function getCountInBox(value){
  return {
    type: "CIGARETTES_COUNT_IN_BOX",
    cigaretesInBox: localStorage.getItem('cigaretesInBox') ? localStorage.getItem('cigaretesInBox') : 20
  }
}

export function resetCountInBox(value){
  localStorage.setItem('cigaretesInBox', value)
  return {
    type: "CIGARETTES_IN_BOX_CHANGED",
    cigaretesInBox: value
  }
}

export function resetCountPerDay(value){
  localStorage.setItem('cigaretesPerDayCount', value)
  return {
    type: "CIGARETTES_COUNT_CHANGED",
    cigaretesPerDayCount: value
  }
}

export function getCount(value){
  return {
    type: "CIGARETTES_COUNT",
    cigaretesPerDayCount: localStorage.getItem('cigaretesPerDayCount') ? localStorage.getItem('cigaretesPerDayCount') : 0
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