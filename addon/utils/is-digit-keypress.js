import Ember from 'ember';

const validKeyCodes = Ember.A([9, 8]);

export default function isDigitKeypress(e) {
  var keyCode = e.keyCode || e.which;
  var digit = String.fromCharCode(keyCode);

  if (/^\d+$/.test(digit) || validKeyCodes.contains(keyCode)) {
    return true;
  }

  return false;
}
