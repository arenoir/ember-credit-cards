import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-cvc', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  //
  // the component: test module is implicitly running in unit test mode,
  // which will change to integration test mode by default in an upcoming
  // version of ember-test-helpers.
  // Add `unit: true` or a `needs:[]` list to explicitly opt in to unit test mode.
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
