import validations from 'ember-credit-cards/utils/validations';
import { module, test } from 'qunit';

module('Unit | Utility | validations', function () {
  test('Validating a card number', function (assert) {
    var validate = validations.validateNumber;

    assert.false(validate(''), 'should fail if empty');
    assert.false(
      validate('                    '),
      'should fail if is a bunch of spaces'
    );
    assert.true(validate('4242424242424242'), 'should success if is valid');
    assert.true(
      validate('4242-4242-4242-4242'),
      'that has dashes in it but is valid'
    );
    assert.true(
      validate('4242 4242 4242 4242'),
      'should succeed if it has spaces in it but is valid'
    );
    assert.false(
      validate('4242424242424241'),
      'that does not pass the luhn checker'
    );
    assert.false(
      validate('42424242424242424'),
      'should fail if is more than 16 digits'
    );
    assert.false(
      validate('424242424'),
      'should fail if is less than 10 digits'
    );
    assert.false(validate('4242424e42424241'), 'should fail with non-digits');
  });

  test('validateCVC without card type', function (assert) {
    var validate = validations.validateCVC;

    assert.false(validate(''), 'should fail if empty');
    assert.true(validate('123'), 'should pass if valid');
    assert.false(validate('12e'), 'should fail with non-digits');
    assert.false(validate('12'), 'should fail with less than 3 digits');
    assert.false(validate('12345'), 'should fail with more than 4 digits');
  });

  test('validateCVC with card type', function (assert) {
    var validate = validations.validateCVC;

    assert.false(
      validate('123', 'amex'),
      'should not validate a three digit number with card type amex'
    );
    assert.true(
      validate('123', 'visa'),
      'should validate a three digit number with a card type other than amex'
    );
    assert.false(
      validate('1234', 'visa'),
      'should not validate a four digit number with a card type other than amex'
    );
    assert.true(
      validate('1234', 'amex'),
      'should validate a four digit number with card type amex'
    );
  });

  test('validateExpiration', function (assert) {
    var validate = validations.validateExpiration;
    var t = new Date();

    assert.false(
      validate(t.getMonth() + 1, t.getFullYear() - 1),
      'should fail expires is before the current year'
    );
    assert.false(
      validate(t.getMonth(), t.getFullYear()),
      'should fail if expires in the current year but before current month'
    );
    assert.false(
      validate(13, t.getFullYear()),
      'should fail if month is invalid'
    );
    assert.true(
      validate(t.getMonth() + 1, t.getFullYear()),
      'should pass if this year and month'
    );
    assert.true(
      validate(t.getMonth(), t.getFullYear() + 1),
      'should pass if after this year'
    );
    assert.true(
      validate(t.getMonth() + 1, t.getFullYear() - 2000),
      'should pass with two-digit year'
    );
    assert.false(
      validate(t.getMonth() + 1, 99),
      'should fail with two-digit year in the past (i.e. 1990s)'
    );

    assert.true(
      validate(t.getMonth() + 1 + '', t.getFullYear() + ''),
      'should pass with string numbers'
    );

    assert.false(validate('h12', '3300'), 'should fail with non-numbers');
    assert.false(validate('12', NaN), 'should fail if year is NaN');

    assert.true(validate('05', '30'), 'should support year shorthand');
  });

  test('validateZipcode', function (assert) {
    var validate = validations.validateZipcode;

    assert.true(validate(94611), 'returns true if valid zip plus 4');
    assert.true(validate('94611'), 'returns true if valid string');
    assert.true(validate('946112370'), 'returns true if valid zip plus 4');
    assert.true(validate(946112370), 'returns true if valid zip plus 4');
    assert.true(
      validate('94611-2370'),
      'returns true if valid zip plus 4 with dash'
    );

    assert.false(validate(956), 'returns false if too short');
    assert.false(validate(95666666), 'returns false if too long');
    assert.false(validate(''), 'returns false if blank');
    assert.false(validate(), 'returns false if undefined');
  });
});
