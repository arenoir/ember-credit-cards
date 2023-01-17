import Component from '@glimmer/component';
import { action } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

function inputValid(value) {
  return value.length <= 10;
}

export default class InputCreditCardZipcodeComponent extends Component {
  get zipcode() {
    return formatters.formatZipcode(this.args.zipcode);
  }

  set zipcode(value) {
    this.args.onUpdate(value);
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

    var value = this._zipcode + digit;
    return inputValid(value);
  }
}
