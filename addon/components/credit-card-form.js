import Ember from 'ember';
import Validations from 'ember-credit-cards/utils/validations';
import Cards from 'ember-credit-cards/utils/cards';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'form',
  name: null,
  number: null,
  month: null,
  year: null,
  cvc: null,

  isValid: computed.and('nameValid', 'numberValid', 'expirationValid', 'cvcValid'),

  nameValid: computed('name', function() {
    var name = this.get('name');

    if (name) {
      return true;
    }

    return false;
  }),

  numberValid: computed('number', function() {
    var number = this.get('number');

    return Validations.validateNumber(number);
  }),

  expirationValid: computed('month', 'year', function() {
    var month = this.get('month');
    var year  = this.get('year');

    console.log(month);
    console.log(year);

    return Validations.validateExpiration(month, year);
  }),

  cvcValid: computed('cvc', 'type', function() {
    var cvc = this.get('cvc');
    var type = this.get('type');

    return Validations.validateCVC(cvc, type);
  }),


  type: computed('number', function() {
    var number = this.get('number');
    var card = Cards.fromNumber(number);

    if (card) {
      return card.type;
    }
  })
});
