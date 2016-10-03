export function changeCounter(number = 1){
  return {
    type: 'CHANGE',
    number
  }
}

export function readFromLocalStorage(){
  let data = localStorage.getItem('smokingStoppedDate') ? localStorage.getItem('smokingStoppedDate'): Date.now()
  return {
    type: "START_DATE_CHANGED",
    date: parseInt(data)
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

export function updateCounter(){
  let sec = 0
  let min = 0
  let hour = 0
  let days = 0
  let months = 0
  let years = 0
  
}