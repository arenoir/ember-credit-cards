import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('input-credit-card-expiration', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);
    var component = this.owner.factoryFor('component:input-credit-card-expiration').create();
    assert.equal(component._state, 'preRender');

    this.render();
    assert.equal(component._state, 'inDOM');
  });


  test('should format month shorthand correctly', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-expiration').create();

    this.render();

    run(function() {
      component.set('month', '4');
    });

    run(function() {
      assert.equal( component.get('value'), '04 / ');
    });
  });


  test('should format forward slash shorthand correctly', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-expiration').create();
    this.render();

    run(function() {
      component.set('month', '8');
    });


    var e = $.Event('keypress');
        e.which = 47; // '/'

    run(function() {
      component.$().trigger(e);
    });

    run(function() {
      var value = component.get('value');
      assert.equal(value, '08 / ');
    });
  });


  test('should only allow numbers', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-expiration').create();
    this.render();

    run(function() {
      component.set('month', '4');
    });


    var e = $.Event('keypress');
        e.which = 100; // 'd'

    component.$().trigger(e);

    run(function() {
      assert.equal( component.get('value'), '04 / ');
    });
  });

  test('should only allow six numbers', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-expiration').create();
    this.render();

    run(function() {
      component.set('month', '4');
      component.set('year', '2015');
    });


    var e = $.Event('keypress');
        e.which = 52; // 'd'

    component.$().trigger(e);

    run(function() {
      assert.equal( component.get('value'), '04 / 2015');
    });
  });
});
