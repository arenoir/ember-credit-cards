import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, typeIn } from '@ember/test-helpers';


module('input-credit-card-expiration', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    assert.expect(1);

    this.set('month', 10);
    this.set('year', 2019);

    await render(hbs`{{input-credit-card-expiration month=month year=year }}`);

    assert.equal(
      this.element.querySelector('input').value,
      '102019'
    );

  });


  test('should format month shorthand correctly', async function(assert) {
    assert.expect(1);

    await render(hbs`{{input-credit-card-expiration}}`);

    await typeIn('input', '4');

    assert.equal(
      this.element.querySelector('input').value,
      '04 / '
    );

  });


  test('should format forward slash shorthand correctly', async function(assert) {
    assert.expect(1);
    this.set('month', 8);
    await render(hbs`{{input-credit-card-expiration month=month}}`);
    await typeIn('input', '/');

    assert.equal(
      this.element.querySelector('input').value,
      '08 / '
    );
  });


  test('should only allow numbers', async function(assert) {
    assert.expect(3);
    this.set('month', '');
    this.set('year', '');
    await render(hbs`{{input-credit-card-expiration month=month year=year}}`);
    await typeIn('input', '4');
    assert.equal(
      this.element.querySelector('input').value,
      '04 / '
    );
    await typeIn('input', 'd');

    assert.equal(
      this.get('month'),
      "04"
    )
    assert.equal(
      this.get('year'),
      ""
    )

  });

  test('should only allow six numbers', async function(assert) {
    assert.expect(1);
    this.set('month', "4");
    this.set('year', "2019");
    await render(hbs`{{input-credit-card-expiration month=month year=year}}`);

    assert.equal(
      this.element.querySelector('input').value,
      '04 / 2019'
    );
  });
});
