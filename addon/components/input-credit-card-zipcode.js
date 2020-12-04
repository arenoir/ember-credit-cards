import TextField from '@ember/component/text-field';
import { computed } from '@ember/object';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

export default TextField.extend({
  type: 'tel',
  classNames: ['input-credit-card-zipcode'],
  autocomplete: 'none',
  autocorrect: 'off',

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);

    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(this.element)) {
      return true;
    }

    var value = this.element.value + digit;
    return value.length <= 10;
  },

  value: computed('zipcode', {
    get() {
      return formatters.formatZipcode(this.zipcode);
    },
    set(key, value) {
      this.set('zipcode', value);
      return formatters.formatZipcode(value);
    }
  })
});
