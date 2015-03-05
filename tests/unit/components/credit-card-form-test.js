import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('credit-card-form', {
  // specify the other units that are required for this test
  needs: [
    'component:input-credit-card-number', 
    'component:input-credit-card-expiration', 
    'component:input-credit-card-cvc'
  ]
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
