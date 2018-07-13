import { run } from '@ember/runloop';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-zipcode', {
  // the component: test module is implicitly running in unit test mode,
  // which will change to integration test mode by default in an upcoming
  // version of ember-test-helpers.
  // Add `unit: true` or a `needs:[]` list to explicitly opt in to unit test mode.
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});


test('should accept 9 digits ', function(assert) {
  var component = this.subject();
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
