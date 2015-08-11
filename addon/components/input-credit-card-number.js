import computed from 'ember-new-computed';
import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import cards from 'ember-credit-cards/utils/cards';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

const cardFromNumber = cards.fromNumber;
const {TextField} = Ember;

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

    var digit = String.fromCharCode(e.which);  
    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }

    var value = el.val() + digit;
    return inputValid(value);
  },


  value: computed('number', {
    get() {
      var number = this.get('number');
      return formatters.formatNumber(number);
    },

    set(key, value) {
      var number = value;
      this.set('number', value);

      return formatters.formatNumber(number);
    }
  })
});
