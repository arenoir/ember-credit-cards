import validations from 'ember-credit-cards/utils/validations';
import { module, test } from 'qunit';

module('validations');

test('Validating a card number', function(assert) {
  var validate = validations.validateNumber;

  assert.equal( validate(''), false, 'should fail if empty');
  assert.equal( validate('                    '), false, 'should fail if is a bunch of spaces');
  assert.equal( validate('4242424242424242'), true, 'should success if is valid');
  assert.equal( validate('4242-4242-4242-4242'), true, 'that has dashes in it but is valid');
  assert.equal( validate('4242 4242 4242 4242'), true, 'should succeed if it has spaces in it but is valid');
  assert.equal( validate('4242424242424241'), false, 'that does not pass the luhn checker');
  assert.equal( validate('42424242424242424'), false, 'should fail if is more than 16 digits');
  assert.equal( validate('424242424'), false, 'should fail if is less than 10 digits');
  assert.equal( validate('4242424e42424241'), false, 'should fail with non-digits');
});


test('validateCVC without card type', function(assert) {
  var validate = validations.validateCVC;
  
  assert.equal( validate(''), false, 'should fail if empty');
  assert.equal( validate('123'), true, 'should pass if valid');
  assert.equal( validate('12e'), false, 'should fail with non-digits');
  assert.equal( validate('12'), false, 'should fail with less than 3 digits');
  assert.equal( validate('12345'), false, 'should fail with more than 4 digits');
});


test('validateCVC with card type', function(assert) {
  var validate = validations.validateCVC;
  
  assert.equal( validate('123', 'amex'), true, 'should pass if amex with 3 digits');
  assert.equal( validate('123', 'visa'), true, 'should validate a three digit number with card type other than amex');
  assert.equal( validate('1234', 'visa'), false, 'should not validate a four digit number with a card type other than amex');
  assert.equal( validate('1234', 'amex'), true, 'should validate a four digit number with card type amex');
});


test('validateExpiration', function(assert) {
  var validate = validations.validateExpiration;
  var t = new Date();

  assert.equal( validate(t.getMonth() + 1, t.getFullYear() - 1), false, 'should fail expires is before the current year');
  assert.equal( validate(t.getMonth(), t.getFullYear()), false, 'should fail if expires in the current year but before current month');
  assert.equal( validate(13, t.getFullYear()), false, 'should fail if month is invalid');
  assert.equal( validate(t.getMonth() + 1, t.getFullYear()), true, 'should pass if this year and month');
  assert.equal( validate(t.getMonth(), t.getFullYear() + 1), true, 'should pass if after this year');
  assert.equal( validate(t.getMonth() + 1, t.getFullYear() - 2000), true, 'should pass with two-digit year');
  assert.equal( validate(t.getMonth() + 1, 99), false, 'should fail with two-digit year in the past (i.e. 1990s)');

  assert.equal( validate(t.getMonth() + 1 + '', t.getFullYear() + ''), true, 'should pass with string numbers');

  assert.equal( validate('h12', '3300'), false, 'should fail with non-numbers');
  assert.equal( validate('12', NaN), false, 'should fail if year is NaN');

  assert.equal( validate('05', '30'), true, 'should support year shorthand');

});


test('validateZipcode', function(assert) {
  var validate = validations.validateZipcode;

  assert.equal( validate(94611), true, 'returns true if valid zip plus 4');
  assert.equal( validate("94611"), true, 'returns true if valid string');
  assert.equal( validate("946112370"), true, 'returns true if valid zip plus 4');
  assert.equal( validate(946112370), true, 'returns true if valid zip plus 4');
  assert.equal( validate("94611-2370"), true, 'returns true if valid zip plus 4 with dash');

  assert.equal( validate(956), false, 'returns false if too short');
  assert.equal( validate(95666666), false, 'returns false if too long');
  assert.equal( validate(''), false, 'returns false if blank');
  assert.equal( validate(), false, 'returns false if undefined');
});
