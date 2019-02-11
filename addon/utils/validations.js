import { A } from '@ember/array';
import cards from 'ember-credit-cards/utils/cards';

var cardFromNumber = cards.fromNumber;
var cardFromType = cards.fromType;
var luhnCheck = cards.luhnCheck;

function validateNumber(num) {
  num = (num + '').replace(/\s+|-/g, '');

  if (!/^\d+$/.test(num)) {
    return false;
  }

  var card = cardFromNumber(num);

  if (card) {
    var cardNumbers = A(card.length);

    return ( cardNumbers.includes(num.length)) && (card.luhn === false || luhnCheck(num));
  }

  return false;
}


function validateExpiration(month, year) {

  if (typeof month === 'string') {
    month = parseInt(month);
  }

  if (typeof year === 'string') {
    year = parseInt(year);
  }

  if (typeof month !== 'number') {
    return false;
  }

  if (typeof year !== 'number') {
    return false;
  }

  if (month > 12) {
    return false;
  }

  if (year < 70) {
    year = 2000 + year;
  }

  var edate = new Date(year, month);
  var today = new Date();

  //Months start from 0 in JavaScript
  edate.setMonth(edate.getMonth() - 1);

  // The cc expires at the end of the month,
  // so we need to make the expiry the first day
  //  of the month after
  edate.setMonth(edate.getMonth() + 1, 1);

  return edate > today;
}


function validateCVC(cvc, type) {
  cvc = (cvc + '').trim();

  if (!/^\d+$/.test(cvc)) {
    return false;
  }

  var card = cardFromType(type);

  if (card) {
    var cvcNumbers = A(card.cvcLength);

    return cvcNumbers.includes(cvc.length);
  } else {
    return cvc.length >= 3 && cvc.length <= 4;
  }
}


function validateZipcode(zip) {
  zip = (zip + '').replace(/\s+|-/g, '');

  var match = /^(\d{5})(\d{0,4})$/g.exec(zip);

  if (match) {
    if (match[2]) {
      return match[2].length === 4;
    }
    return match[1].length === 5;
  }

  return false;
}


export default {
  validateNumber: validateNumber,
  validateExpiration: validateExpiration,
  validateCVC: validateCVC,
  validateZipcode: validateZipcode
};
