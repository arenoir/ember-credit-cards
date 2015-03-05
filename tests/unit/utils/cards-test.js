import cards from 'ember-credit-cards/utils/cards';
import { module, test } from 'qunit';

module('cards');

test('should return Visa that begins with 40', function(assert) {
  assert.equal(cards.cardType('4012121212121212'), 'visa');
});

test('that begins with 5 should return MasterCard', function(assert) {
  assert.equal(cards.cardType('5555555555554444'), 'mastercard');
});

test('that begins with 34 should return American Express', function(assert) {
  assert.equal(cards.cardType('3412121212121212'), 'amex');
});

test('that is not numbers should return null', function(assert) {
      assert.equal(cards.cardType('aoeu'), null);
});

test('should return correct card for all test numbers', function(assert) {

  assert.equal(cards.cardType('4917300800000000'), 'visaelectron');

  assert.equal(cards.cardType('6759649826438453'), 'maestro');

  assert.equal(cards.cardType('6007220000000004'), 'forbrugsforeningen');

  assert.equal(cards.cardType('5019717010103742'), 'dankort');

  assert.equal(cards.cardType('4111111111111111'), 'visa');
  assert.equal(cards.cardType('4012888888881881'), 'visa');
  assert.equal(cards.cardType('4222222222222'), 'visa');
  assert.equal(cards.cardType('4462030000000000'), 'visa');
  assert.equal(cards.cardType('4484070000000000'), 'visa');

  assert.equal(cards.cardType('5555555555554444'), 'mastercard');
  assert.equal(cards.cardType('5454545454545454'), 'mastercard');

  assert.equal(cards.cardType('378282246310005'), 'amex');
  assert.equal(cards.cardType('371449635398431'), 'amex');
  assert.equal(cards.cardType('378734493671000'), 'amex');

  assert.equal(cards.cardType('30569309025904'), 'dinersclub');
  assert.equal(cards.cardType('38520000023237'), 'dinersclub');
  assert.equal(cards.cardType('36700102000000'), 'dinersclub');
  assert.equal(cards.cardType('36148900647913'), 'dinersclub');

  assert.equal(cards.cardType('6011111111111117'), 'discover');
  assert.equal(cards.cardType('6011000990139424'), 'discover');

  assert.equal(cards.cardType('6271136264806203568'), 'unionpay');
  assert.equal(cards.cardType('6236265930072952775'), 'unionpay');
  assert.equal(cards.cardType('6204679475679144515'), 'unionpay');
  assert.equal(cards.cardType('6216657720782466507'), 'unionpay');

  assert.equal(cards.cardType('3530111333300000'), 'jcb');
  assert.equal(cards.cardType('3566002020360505'), 'jcb');

});
