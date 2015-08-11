import computed from 'ember-new-computed';
import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import formatters from 'ember-credit-cards/utils/formatters';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';

const {TextField} = Ember;

export default TextField.extend({
  type: 'tel',
  classNames: ['input-credit-card-zipcode'],

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);
    
    if (!isDigitKeypress(e)) {
      return false;
    }
    
    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }
    
    var value = el.val() + digit;
    return value.length <= 10;
  },

  value: computed('zipcode', {
    get() {
      var zipcode = this.get('zipcode');
      return formatters.formatZipcode(zipcode);
    },

    set(key, value) {
      var zipcode = value;
      this.set('zipcode', value);
      return formatters.formatZipcode(zipcode);
    }
  })
});
