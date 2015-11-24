import Ember from 'ember';

const validKeyCodes = Ember.A([9, 8, 46, 27, 13]);

export default function isDigitKeypress(e) {
  var keyCode = e.keyCode || e.which;

  return validKeyCodes.contains(keyCode);
}
