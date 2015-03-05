import Ember from 'ember';
import formatNumber from 'ember-credit-cards/utils/format-number';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import cards from 'ember-credit-cards/utils/cards';

var cardFromNumber = cards.fromNumber;
var computed = Ember.computed;

function numberValid(value) {
  value = (value + '').replace(/\D/g, '');

  var card = cardFromNumber(value);

  if (card) {
    return value.length <= card.length[card.length.length - 1];
  } else {
    return value.length <= 16;
  }
}


export default Ember.TextField.extend({
  classNames: ['input-credit-card-number'],
  placeholder: '•••• •••• •••• ••••',
  autocomplete: 'cc-number',
  type: 'tel',

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);
    var el = this.$();

    if (hasTextSelected(el)) {
      return;
    }

    if (!/^\d+$/.test(digit)) {
      return false;
    }

    var value = el.val() + digit;

    if (!numberValid(value)) {
      return false;
    }

  },


  value: computed('number', function(key, value) {
    var number = this.get('number');

    if (arguments.length > 1) {
      number = value;
      this.set('number', value);
    }

    return formatNumber(number);
  })

});
