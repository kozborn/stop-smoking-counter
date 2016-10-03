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