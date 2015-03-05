export default function restrictNumeric(e) { 
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  
  if (e.which === 32) {
    return false;
  }
  
  if (e.which === 0) {
    return true;
  }
  
  if (e.which < 33) {
    return true;
  }
  
  var input = String.fromCharCode(e.which);
  
  return !!/[\d\s]/.test(input);
}
