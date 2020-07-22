import TextField from '@ember/component/text-field';
import { computed } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import cards from 'ember-credit-cards/utils/cards';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

const cardFromNumber = cards.fromNumber;

function inputValid(value) {
  value = (value + '').replace(/\D/g, '');

  var card = cardFromNumber(value);

  if (card) {
    return value.length <= card.length[card.length.length - 1];
  } else {
    return value.length <= 16;
  }
}


export default TextField.extend({
  classNames: ['input-credit-card-number'],
  placeholder: '•••• •••• •••• ••••',
  autocomplete: 'cc-number',
  type: 'tel',

  keyPress: function(e) {
    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(this.element)) {
      return true;
    }

    var digit = String.fromCharCode(e.which);
    var value = this.element.value + digit;
    return inputValid(value);
  },


  value: computed('number', {
    get() {
      return formatters.formatNumber(this.number);
    },
    set(key, value) {
      this.set('number', value);
      return formatters.formatNumber(value);
    }
  })
});
