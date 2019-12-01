import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('input-credit-card-zipcode', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    var component = this.owner.factoryFor('component:input-credit-card-zipcode').create();
    assert.equal(component._state, 'preRender');

    this.render();
    assert.equal(component._state, 'inDOM');
  });


  test('should accept 9 digits ', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-zipcode').create();
    this.render();

    run(function() {
      component.set('zipcode', '946062370');
    });

    // Ember.run(function() {
    //   component.$().trigger({type: 'keypress', which: 52, keyCode: 52});
    // });

    run(function() {
      var value = component.get('value');
      assert.equal(value, '94606-2370');
    });
  });
});
