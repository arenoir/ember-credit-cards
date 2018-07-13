import { run } from '@ember/runloop';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-number', {
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


test('it should format cc number correctly', function(assert) {
  var component = this.subject();

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
  var component = this.subject();

  component.set('number', '37828');

  this.render();

  // var e = $.Event('keypress');
  //     e.which = 56; // '8'

  // component.$().trigger(e);

  run(function() {
    assert.equal( component.get('value'), '3782 8');
  });
});
