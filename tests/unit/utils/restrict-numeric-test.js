import restrictNumeric from 'ember-credit-cards/utils/restrict-numeric';
import { module, test } from 'qunit';

module('restrictNumeric');

test('it returns true if event is number', function(assert) {
  var e = {which: 52};
  var result = restrictNumeric(e);

  assert.equal(result, true);
});