import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import cards from 'ember-credit-cards/utils/cards';

var cardFromNumber = cards.fromNumber;
var computed = Ember.computed;

function inputValid(value) {
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
    if (!/^\d+$/.test(digit)) {
      return false;
    }
    
    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }

    var value = el.val() + digit;
    return inputValid(value);
  },


  value: computed('number', function(key, value) {
    var number = this.get('number');

    if (arguments.length > 1) {
      number = value;
      this.set('number', value);
    }

    return formatters.formatNumber(number);
  })

});
