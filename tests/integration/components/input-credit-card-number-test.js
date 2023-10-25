import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, typeIn } from '@ember/test-helpers';

module('Integration | Component | input-credit-card-number', function (hooks) {
  setupRenderingTest(hooks);

  test('it should format cc number correctly', async function (assert) {
    assert.expect(2);
    this.set('number', '42424');
    this.set('onUpdate', (value) => {
      this.set('number', value);
    });
    await render(
      hbs`<InputCreditCardNumber @number={{this.number}} @onUpdate={{this.onUpdate}} />`
    );
    assert.equal(this.element.querySelector('input').value, '4242 4');
    await typeIn('input', '5');
    assert.equal(this.element.querySelector('input').value, '4242 45');
  });

  test('it should return a value without spaces', async function (assert) {
    this.set('number', '');
    this.set('onUpdate', (value) => {
      this.set('number', value);
    });
    await render(
      hbs`<InputCreditCardNumber @number={{this.number}} @onUpdate={{this.onUpdate}} />`
    );
    await typeIn('input', '41111');
    assert.equal(this.number, '41111');
  });

  test("it shouldn't call onUpdate with an invalid length", async function (assert) {
    this.set('number', '4111111111111111');
    this.set('onUpdate', (value) => {
      this.set('number', value);
    });
    await render(
      hbs`<InputCreditCardNumber @number={{this.number}} @onUpdate={{this.onUpdate}} />`
    );
    await typeIn('input', '1');
    assert.equal(this.number, '4111111111111111');
  });
});
