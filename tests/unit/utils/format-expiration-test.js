import formatExpiration from 'ember-credit-cards/utils/format-expiration';
import { module, test } from 'qunit';

module('formatExpiration');

test('it should format incomplete date', function(assert) {
  var result = formatExpiration('2');
  assert.equal(result, "02 / ");
});

test('it should format incomplete date', function(assert) {
  var result = formatExpiration('12', '2010');
  assert.equal(result, "12 / 2010");
});
