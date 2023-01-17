/* eslint-disable ember/no-classic-classes */
import TextField from '@ember/component/text-field';
import { computed } from '@ember/object';
import formatters from 'ember-credit-cards/utils/formatters';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

function inputValid(value) {
  if (!value) {
    return false;
  }

  value = (value + '').replace(/\D/g, '');

  if (value.length > 6) {
    return false;
  }

  return true;
}

function parseInput(value) {
  var parts = (value + '').match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);

  if (!parts) {
    return [];
  }

  var mon = parts[1] || '';
  var year = parts[3] || '';

  if (mon.length === 1 && mon !== '0' && mon !== '1') {
    mon = '0' + mon;
  }

  return [mon, year];
}

export default TextField.extend({
  classNames: ['input-credit-card-expiration'],
  month: null,
  year: null,
  placeholder: '•• / ••',
  autocomplete: 'cc-exp',
  type: 'tel',
  required: true,

  keyPress: function (e) {
    var digit = String.fromCharCode(e.which);

    if (!isDigitKeypress(e)) {
      return false;
    }

    if (hasTextSelected(this.element)) {
      return true;
    }

    var value = this.element.value + digit;
    return inputValid(value);
  },

  value: computed('month', 'year', {
    get() {
      return formatters.formatExpiration(this.month, this.year);
    },
    set(key, value) {
      var parsed = parseInput(value);

      var month = parsed[0];
      var year = parsed[1];

      this.setProperties({
        month: month,
        year: year,
      });

      return formatters.formatExpiration(month, year);
    },
  }),
});
