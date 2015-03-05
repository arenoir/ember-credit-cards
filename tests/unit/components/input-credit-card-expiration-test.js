import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-expiration', {

});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});


test('should format month shorthand correctly', function(assert) {
  var component = this.subject();

  this.render();

  Ember.run(function() {
    component.set('month', '4');
  });
    
  Ember.run(function() {
    assert.equal( component.get('value'), '04 / ');
  });
});


test('should format forward slash shorthand correctly', function(assert) {
  var component = this.subject();  
  this.render();

  Ember.run(function() {
    component.set('month', '8');
  });


  var e = $.Event('keypress');
      e.which = 47; // '/'

  Ember.run(function() {
    component.$().trigger(e);
  });
    
  Ember.run(function() {
    var value = component.get('value');
    assert.equal(value, '08 / ');
  });
});


test('should only allow numbers', function(assert) {
  var component = this.subject();  
  this.render();

  Ember.run(function() {
    component.set('month', '4');
  });


  var e = $.Event('keypress');
      e.which = 100; // 'd'

  component.$().trigger(e);
    
  Ember.run(function() {
    assert.equal( component.get('value'), '04 / ');
  });
});

test('should only allow six numbers', function(assert) {
  var component = this.subject();  
  this.render();

  Ember.run(function() {
    component.set('month', '4');
    component.set('year', '2015');
  });


  var e = $.Event('keypress');
      e.which = 52; // 'd'

  component.$().trigger(e);
    
  Ember.run(function() {
    assert.equal( component.get('value'), '04 / 2015');
  });
});
