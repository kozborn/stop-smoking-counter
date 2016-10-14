export function formatDate(date) {
  let dateObj = null
  if(date){
    dateObj = new Date(date);
  }
  else 
    dateObj = new Date(Date.now())
  return _formatDate(dateObj);
}

function _formatDate(date){
  return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

export function calculateTime(secondsElapsed){
  let days = Math.floor(secondsElapsed / (60 * 60 * 24))
  let hours = Math.floor((secondsElapsed - (days * 24 * 60 * 60)) / (60* 60))
  let minutes = Math.floor((secondsElapsed - (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60)
  let seconds = Math.floor((secondsElapsed - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)))
  return {days, hours, minutes, seconds}
}

 export function getDateString(date){
  let d = new Date(date)
  let datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
  d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  return datestring;
}

export function calculateCost(secondsElapsed){
  let hours = Math.floor((secondsElapsed) / (60 * 60))
}

export function eachCigareteCost(totalPackCost, cigarettesCount){
  return totalPackCost / cigarettesCount;
}

export function hourlyCost(totalPackCost, cigarettesCount, smokedPerDay){
  return ((totalPackCost / cigarettesCount) * smokedPerDay) / 24 
}


export function formatCounter(secondsElapsed){
  let {days, hours, minutes, seconds} = calculateTime(secondsElapsed);
  let count = ""
  count = `${seconds} seconds without cigarette.`
  if(minutes)
    if(minutes == 1)
      count = `${minutes} minute and ` + count
    else
      count = `${minutes} minutes and ` + count
  if(hours)
    if(hours == 1)
      count = `${hours} hour ` + count
    else
      count = `${hours} hours ` + count
  if(days)
    if(days == 1)
      count = `${days} day, ` + count
    else
      count = `${days} days, ` + count
  return count;
}