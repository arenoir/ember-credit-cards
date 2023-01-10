import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import formatters from 'ember-credit-cards/utils/formatters';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

function inputValid(value) {
  if (!value) {
    return false;
  }

  value = (value + '').replace(/\D/g, '');

  if (value.length > 6) {
    return false;
  }

  return true;
}

function parseInput(value) {
  var parts = (value + '').match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);

  if (!parts) {
    return [];
  }

  var mon = parts[1] || '';
  var year = parts[3] || '';

  if (mon.length === 1 && mon !== '0' && mon !== '1') {
    mon = '0' + mon;
  }

  return [mon, year];
}

export default class InputCreditCardExpirationComponent extends Component {
  @tracked
  _value;

  constructor() {
    super(...arguments);
    this._value = formatters.formatExpiration(this.args.month, this.args.year);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    var isBackspace = this._value.length - 1 === value.length;
    var parsed = parseInput(value);

    var month = parsed[0];
    var year = parsed[1];

    this._value = formatters.formatExpiration(month, year, isBackspace);

    this.args.onUpdateMonth(month);
    this.args.onUpdateYear(year);
  }

  @action
  keyPress(e) {
    var digit = String.fromCharCode(e.which);

    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(e.target)) {
      return true;
    }

    var value = this._value + digit;
    return inputValid(value);
  }
}
