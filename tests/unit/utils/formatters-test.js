import formatters from 'ember-credit-cards/utils/formatters';
import { module, test } from 'qunit';

module('formatters');

//formatExpiration
test('it should format incomplete date', function(assert) {
  var result = formatters.formatExpiration('2');
  assert.equal(result, "02 / ");
});

test('it should format incomplete date', function(assert) {
  var result = formatters.formatExpiration('12', '2010');
  assert.equal(result, "12 / 2010");
});

//formatNumber
test('it should format cc number correctly', function(assert) {
  var result = formatters.formatNumber(5018181818181818);
  assert.equal(result, "5018 1818 1818 1818");
});

test('it should format cc number string correctly', function(assert) {
  var result = formatters.formatNumber('5018181818181818');
  assert.equal(result, "5018 1818 1818 1818");
});


//formatZipcode
test('it should format cc zipcode correctly', function(assert) {
  var result = formatters.formatZipcode(94606);
  assert.equal(result, "94606");
});

test('it should format cc zipcode correctly', function(assert) {
  var result = formatters.formatZipcode(946068523);
  assert.equal(result, "94606-8523");
});

test('it should format cc partial zip correctly', function(assert) {
  var result = formatters.formatZipcode(946);
  assert.equal(result, "946");
});

test('it should format cc partial zip correctly', function(assert) {
  var result = formatters.formatZipcode(946068);
  assert.equal(result, "94606-8");
});