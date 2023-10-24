import Component from '@glimmer/component';
import { action } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import cards from 'ember-credit-cards/utils/cards';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

const cardFromNumber = cards.fromNumber;

function stripSpaces(value) {
  return (value + '').replace(/\D/g, '');
}

function inputValid(value) {
  value = stripSpaces(value);

  var card = cardFromNumber(value);

  if (card) {
    return value.length <= card.length[card.length.length - 1];
  } else {
    return value.length <= 16;
  }
}

export default class InputCreditCardNumberComponent extends Component {
  get number() {
    return formatters.formatNumber(this.args.number);
  }

  set number(value) {
    if (inputValid(value)) {
      this.args.onUpdate(stripSpaces(value));
    }
  }

  @action
  keyPress(e) {
    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(e.target)) {
      return true;
    }

    var digit = String.fromCharCode(e.which);
    var value = this.args.number + digit;
    return inputValid(value);
  }
}
