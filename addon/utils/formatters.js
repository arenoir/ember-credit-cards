import { isEmpty } from '@ember/utils';
import cards from 'ember-credit-cards/utils/cards';

var cardFromNumber = cards.fromNumber;

function formatNumber(num) {
  num = (num + '').replace(/\D/g, '');

  var card = cardFromNumber(num);

  if (!card) {
    return num;
  }

  var upperLength = card.length[card.length.length - 1];

  num = num.slice(0, upperLength);

  if (card.format.global) {
    var ref = num.match(card.format);

    return ref != null ? ref.join(' ') : '';
  } else {
    var groups = card.format.exec(num);

    if (groups == null) {
      return;
    }

    groups.shift();

    groups = groups.filter(function (g) {
      return !isEmpty(g);
    });

    return groups.join(' ');
  }
}

function formatExpiration(mon, year) {
  var sep = '';

  mon = mon || '';
  year = year || '';

  if (mon.length === 1 && mon !== '0' && mon !== '1') {
    mon = '0' + mon;
  }

  if (mon.length === 2) {
    sep = ' / ';
  }

  return mon + sep + year;
}

function formatZipcode(zip) {
  zip = zip || '';

  var match = /^(\d{0,5})(\d{0,4})$/g.exec(zip);

  if (match) {
    if (match[2]) {
      return match[1] + '-' + match[2];
    }
  }

  return zip;
}

export default {
  formatNumber: formatNumber,
  formatExpiration: formatExpiration,
  formatZipcode: formatZipcode,
};
