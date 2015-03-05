import formatNumber from 'ember-credit-cards/utils/format-number';
import { module, test } from 'qunit';

module('formatNumber');

test('it should format cc number correctly', function(assert) {
  var result = formatNumber(5018181818181818);
  assert.equal(result, "5018 1818 1818 1818");
});

test('it should format cc number string correctly', function(assert) {
  var result = formatNumber('5018181818181818');
  assert.equal(result, "5018 1818 1818 1818");
});
