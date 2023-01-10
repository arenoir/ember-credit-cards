import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | input-credit-card-zipcode', function (hooks) {
  setupRenderingTest(hooks);

  test('should accept 9 digits ', async function (assert) {
    assert.expect(1);
    this.set('zipcode', '946062370');
    await render(hbs`
      <InputCreditCardZipcode @zipcode={{this.zipcode}} />
    `);
    assert.equal(this.element.querySelector('input').value, '94606-2370');
  });
});
