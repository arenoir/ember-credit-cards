import isWhitelistKeypress from 'ember-credit-cards/utils/is-whitelist-keypress';

export default function isDigitKeypress(e) {
  var keyCode = e.keyCode || e.which;
  var digit = String.fromCharCode(keyCode);

  if (/^\d+$/.test(digit) || isWhitelistKeypress(e)) {
    return true;
  }

  return false;
}
