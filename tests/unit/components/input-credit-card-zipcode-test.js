import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-zipcode', {});

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

  Ember.run(function() {
    component.set('zipcode', '946062370');
  });

  // Ember.run(function() {
  //   component.$().trigger({type: 'keypress', which: 52, keyCode: 52});
  // });
    
  Ember.run(function() {
    var value = component.get('value');
    assert.equal(value, '94606-2370');
  });
});