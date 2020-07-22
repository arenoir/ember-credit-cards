import { and } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Validations from 'ember-credit-cards/utils/validations';
import Cards from 'ember-credit-cards/utils/cards';

export default Component.extend({
  tagName: 'form',
  classNames: ['credit-card-form'],
  classNameBindings: ['isValid'],
  name: null,
  number: null,
  month: null,
  year: null,
  cvc: null,
  zipcode: null,
  zipcodeRequired: false,
  onValidate(){},

  isValid: and('nameValid', 'numberValid', 'expirationValid', 'cvcValid', 'zipcodeValid'),

  becameValid: observer('isValid', function() {
    this.onValidate(this.isValid);
  }),

  nameValid: computed('name', function() {
    var name = this.name;

    if (name) {
      return true;
    }

    return false;
  }),

  numberValid: computed('number', function() {
    var number = this.number;

    return Validations.validateNumber(number);
  }),

  expirationValid: computed('month', 'year', function() {
    var month = this.month;
    var year  = this.year;

    return Validations.validateExpiration(month, year);
  }),

  cvcValid: computed('cvc', 'type', function() {
    var cvc = this.cvc;
    var type = this.type;

    return Validations.validateCVC(cvc, type);
  }),

  zipcodeValid: computed('zipcodeRequired', 'zipcode', function() {
    if (this.zipcodeRequired) {
      var zip = this.zipcode;

      return Validations.validateZipcode(zip);
    }

    return true;
  }),

  type: computed('number', function() {
    var number = this.number;
    var card = Cards.fromNumber(number);

    if (card) {
      return card.type;
    } else {
      return '';
    }
  })
});
