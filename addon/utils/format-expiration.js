export default function formatExpiration(mon, year) {
  var sep = '';

  mon = mon || '';
  year = year || '';
  
  if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
    mon = "0" + mon;
  }

  if (mon.length === 2) {
    sep = ' / '; 
  } 

  return mon + sep + year;
}
