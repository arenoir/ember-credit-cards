import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | input-credit-card-cvc', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.set('cvc', 300);

    await render(
      hbs`<InputCreditCardCvc @cvc={{this.cvc}} class="form-control"/>`
    );

    assert.equal(this.element.querySelector('.form-control').value, '300');
  });
});
