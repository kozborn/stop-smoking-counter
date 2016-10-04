export function changeCounter(number = 1){
  return {
    type: 'CHANGE',
    number
  }
}

export function readFromLocalStorage(){
  let data = localStorage.getItem('smokingStoppedDate') ? localStorage.getItem('smokingStoppedDate'): Date.now()
  let cigaretesPerDayCount = localStorage.getItem('cigaretesPerDayCount') ? localStorage.getItem('cigaretesPerDayCount'): 0
  return {
    type: "DATA_CHANGED",
    date: parseInt(data),
    cigaretesPerDayCount: cigaretesPerDayCount
  }
}

export function setStartDate(){
  let data = Date.now()
  localStorage.setItem('smokingStoppedDate', parseInt(data))
  return {
    type: "START_DATE_CHANGED",
    date: parseInt(data)
  }
}

export function resetCount(value){
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