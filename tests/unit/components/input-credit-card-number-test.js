import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-number', {});

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
    
  Ember.run(function() {
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
    
  Ember.run(function() {
    assert.equal( component.get('value'), '3782 8');
  });
});

