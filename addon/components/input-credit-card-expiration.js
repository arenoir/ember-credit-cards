import Ember from 'ember';
import formatExpiration from 'ember-credit-cards/utils/format-expiration';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';

var computed = Ember.computed;

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
  
  if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
    mon = "0" + mon;
  }

  return [mon, year];
}


export default Ember.TextField.extend({
  classNames: ['input-credit-card-expiration'],
  month: null,
  year: null,
  placeholder: '•• / ••',
  autocomplete: 'cc-exp',

  value: computed('month', 'year', function(key, value) {
    var month = this.get('month');
    var year  = this.get('year');

    if (arguments.length > 1) {

      var parsed = parseInput(value);

      month = parsed[0];
      year = parsed[1];

      this.setProperties({
        month: month,
        year: year
      });
    } 

    return formatExpiration(month, year);
  }),


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

    if (!inputValid(value)) {
      return false;
    }
  }

});
