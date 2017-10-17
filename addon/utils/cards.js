var defaultFormat = /(\d{1,4})/g;

var cards = [
  {
    type: 'visaelectron',
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'maestro',
    pattern: /^(5(018|0[23]|[68])|6(39|7))/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },{
    type: 'forbrugsforeningen',
    pattern: /^600/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'dankort',
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'mastercard',
    pattern: /^5[1-5]\d{14}$|^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3,4],
    luhn: true
  },{
    type: 'dinersclub',
    pattern: /^3[0689]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },{
    type: 'discover',
    pattern: /^6([045]|22)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },{
    type: 'unionpay',
    pattern: /^(62|88)/,
    format: defaultFormat,
    length: [16,17,18,19],
    cvcLength: [3],
    luhn: false
  },{
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }
];

function cardFromNumber(num) {
  var card, i, len;
  num = (num + '').replace(/\D/g, '');
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
}

function cardFromType(type) {
  var card, i, len;
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
}

function luhnCheck(num) {
  var digit, digits, i, len, odd, sum;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (i = 0, len = digits.length; i < len; i++) {
    digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function cardTypeFromNumber(num) {
  var card = cardFromNumber(num);

  if (!card) {
    return null;
  }

  return card.type;
}

export default {
  cardType: cardTypeFromNumber,
  fromNumber: cardFromNumber,
  fromType: cardFromType,
  luhnCheck: luhnCheck
};
