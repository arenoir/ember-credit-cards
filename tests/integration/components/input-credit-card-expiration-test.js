import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, typeIn } from '@ember/test-helpers';

module(
  'Integration | Component | input-credit-card-expiration',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      assert.expect(1);

      this.set('month', 10);
      this.set('year', 2019);
      this.set('setMonth', (month) => {
        this.set('month', month);
      });
      this.set('setYear', (year) => {
        this.set('year', year);
      });

      await render(
        hbs`
        <InputCreditCardExpiration
          @month={{this.month}}
          @year={{this.year}}
          @onUpdateMonth={{this.setMonth}}
          @onUpdateYear={{this.setYear}}
        />
      `
      );

      assert.equal(this.element.querySelector('input').value, '102019');
    });

    test('should format month shorthand correctly', async function (assert) {
      assert.expect(1);

      this.set('setMonth', (month) => {
        this.set('month', month);
      });
      this.set('setYear', (year) => {
        this.set('year', year);
      });

      await render(
        hbs`
        <InputCreditCardExpiration
          @month={{this.month}}
          @year={{this.year}}
          @onUpdateMonth={{this.setMonth}}
          @onUpdateYear={{this.setYear}}
        />
      `
      );

      await typeIn('input', '4');

      assert.equal(this.element.querySelector('input').value, '04 / ');
    });

    test('should format forward slash shorthand correctly', async function (assert) {
      assert.expect(1);
      this.set('month', 8);
      this.set('setMonth', (month) => {
        this.set('month', month);
      });
      this.set('setYear', (year) => {
        this.set('year', year);
      });

      await render(
        hbs`
        <InputCreditCardExpiration
          @month={{this.month}}
          @year={{this.year}}
          @onUpdateMonth={{this.setMonth}}
          @onUpdateYear={{this.setYear}}
        />
      `
      );
      await typeIn('input', '/');

      assert.equal(this.element.querySelector('input').value, '08 / ');
    });

    test('should only allow numbers', async function (assert) {
      assert.expect(3);
      this.set('month', '');
      this.set('year', '');
      this.set('setMonth', (month) => {
        this.set('month', month);
      });
      this.set('setYear', (year) => {
        this.set('year', year);
      });
      await render(
        hbs`
        <InputCreditCardExpiration
          @month={{this.month}}
          @year={{this.year}}
          @onUpdateMonth={{this.setMonth}}
          @onUpdateYear={{this.setYear}}
        />
      `
      );
      await typeIn('input', '4');
      assert.equal(this.element.querySelector('input').value, '04 / ');
      await typeIn('input', 'd');

      assert.equal(this.month, '04');
      assert.equal(this.year, '');
    });

    test('should only allow six numbers', async function (assert) {
      assert.expect(1);
      this.set('month', '4');
      this.set('year', '2019');
      this.set('setMonth', (month) => {
        this.set('month', month);
      });
      this.set('setYear', (year) => {
        this.set('year', year);
      });
      await render(
        hbs`
        <InputCreditCardExpiration
          @month={{this.month}}
          @year={{this.year}}
          @onUpdateMonth={{this.setMonth}}
          @onUpdateYear={{this.setYear}}
        />
      `
      );

      assert.equal(this.element.querySelector('input').value, '04 / 2019');
    });
  }
);
