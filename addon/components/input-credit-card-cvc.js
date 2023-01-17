import Component from '@glimmer/component';
import { action } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';
import isWhitelistKeypress from 'ember-credit-cards/utils/is-whitelist-keypress';

function inputValid(value) {
  return value.length <= 4;
}

export default class InputCreditCardCvcComponent extends Component {
  get cvc() {
    return formatters.formatCvc(this.args.cvc);
  }

  set cvc(value) {
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

    var value = (this.args.cvc || '') + digit;

    return isWhitelistKeypress(e) || inputValid(value);
  }
}
