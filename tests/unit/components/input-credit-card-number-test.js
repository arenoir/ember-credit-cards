import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('input-credit-card-number', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    var component = this.owner.factoryFor('component:input-credit-card-number').create();
    assert.equal(component._state, 'preRender');

    this.render();
    assert.equal(component._state, 'inDOM');
  });


  test('it should format cc number correctly', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-number').create();

    component.set('number','42424');

    this.render();

    // var e = $.Event('keypress');
    //     e.which = 52; // '4'

    // component.$().trigger(e);

    run(function() {
      assert.equal( component.get('value'), '4242 4');
    });
  });


  test('should format amex cc number correctly', function(assert) {
    var component = this.owner.factoryFor('component:input-credit-card-number').create();

    component.set('number', '37828');

    this.render();

    // var e = $.Event('keypress');
    //     e.which = 56; // '8'

    // component.$().trigger(e);

    run(function() {
      assert.equal( component.get('value'), '3782 8');
    });
  });
});
