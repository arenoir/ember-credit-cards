import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, typeIn } from '@ember/test-helpers';

module('input-credit-card-number', function(hooks) {
  setupRenderingTest(hooks);


  test('it should format cc number correctly', async function(assert) {
    assert.expect(2);
    this.set('number', '42424');
    await render(hbs`{{input-credit-card-number number=number}}`);
    assert.equal(
      this.element.querySelector('input').value,
      '4242 4'
    );
    await typeIn('input', '5');
    assert.equal(
      this.element.querySelector('input').value,
      '4242 45'
    );
  });
});
