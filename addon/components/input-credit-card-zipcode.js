import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';

var computed = Ember.computed;

export default Ember.TextField.extend({
  type: 'tel',
  classNames: ['input-credit-card-zipcode'],

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
    return value.length <= 10;
  },

  value: computed('zipcode', function(key, value) {
    var zipcode = this.get('zipcode');

    if (arguments.length > 1) {
      zipcode = value;
      this.set('zipcode', value);
    }

    return formatters.formatZipcode(zipcode);
  })

});
