import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('credit-card-form', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.owner.factoryFor('component:credit-card-form').create();
    assert.equal(component._state, 'preRender');

    // renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // tests for standard label

  test('it should format Card Number label correctly with default value when no numberLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();
    
    run(function() {
      assert.equal(component.$('.cc-number .control-label').text().trim(), 'Card Number', 'label says Card Number');
    });
  });

  test('it should format Security Code label correctly with default value when no securityCodeLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();
    
    run(function() {
      assert.equal(component.$('.cc-cvc .control-label').text().trim(), 'Security Code', 'label says Security Code');
    });
  });

  test('it should format Name on Card label correctly with default value when no nameOnCardLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();
    
    run(function() {
      assert.equal(component.$('.cc-name .control-label').text().trim(), 'Name on Card', 'label says Name on Card');
    });
  });

  test('it should format Expiration label correctly with default value when no expirationLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();
    
    run(function() {
      assert.equal(component.$('.cc-expiration .control-label').first().text().trim(), 'Expiration', 'label says Expiration');
    });
  });

  test('it should format Zip Code label correctly with default value when no zipCodeLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('zipcodeRequired', true);
    });

    run(function() {
      assert.equal(component.$('.cc-expiration .control-label').last().text().trim(), 'Zip Code', 'label says Zip Code');
    });
  });

  // tests for custom label

  test('it should format Card Number label correctly with custom numberLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('numberLabel', 'Kaartnummer');
    });
    
    run(function() {
      assert.equal(component.$('.cc-number .control-label').text().trim(), 'Kaartnummer', 'label says Kaartnummer');
    });
  });

  test('it should format Security Code label correctly with custom securityCodeLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('securityCodeLabel', 'Veiligheidscode');
    });
    
    run(function() {
      assert.equal(component.$('.cc-cvc .control-label').text().trim(), 'Veiligheidscode', 'label says Veiligheidscode');
    });
  });

  test('it should format Name on Card label correctly with custom nameOnCardLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('nameOnCardLabel', 'Naam op Kaart');
    });
    
    run(function() {
      assert.equal(component.$('.cc-name .control-label').text().trim(), 'Naam op Kaart', 'label says Naam op Kaart');
    });
  });

  test('it should format Expiration label correctly with custom expirationLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('expirationLabel', 'Vervalt op');
    });
    
    run(function() {
      assert.equal(component.$('.cc-expiration .control-label').first().text().trim(), 'Vervalt op', 'label says Vervalt op');
    });
  });

  test('it should format Zip Code label correctly with custom zipCodeLabel provided', function(assert) {
    this.render();

    var component = this.owner.factoryFor('component:credit-card-form').create();

    run(function() {
      component.set('zipCodeLabel', 'Postcode');
      component.set('zipcodeRequired', true);
    });

    run(function() {
      assert.equal(component.$('.cc-expiration .control-label').last().text().trim(), 'Postcode', 'label says Postcode');
    });
  });
});
