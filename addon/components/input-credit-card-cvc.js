/* eslint-disable ember/no-classic-classes */
import TextField from '@ember/component/text-field';
import { computed } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';
import isWhitelistKeypress from 'ember-credit-cards/utils/is-whitelist-keypress';

export default TextField.extend({
  classNames: ['input-credit-card-cvc'],
  autocomplete: 'cc-csc',
  placeholder: '•••',
  label: 'Expiration',
  type: 'tel',

  keyPress: function (e) {
    var digit = String.fromCharCode(e.which);

    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(this.element)) {
      return true;
    }

    var value = this.element.value + digit;

    return isWhitelistKeypress(e) || value.length <= 4;
  },

  value: computed('cvc', {
    get() {
      return this.cvc;
    },
    set(propertyName, newValue) {
      var number = newValue.replace(/\D/g, '').slice(0, 4);
      this.set('cvc', newValue);

      return number;
    },
  }),
});
