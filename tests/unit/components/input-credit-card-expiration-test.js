import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('input-credit-card-expiration', {
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


  var e = Ember.$.Event('keypress');
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


  var e = Ember.$.Event('keypress');
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


  var e = Ember.$.Event('keypress');
      e.which = 52; // 'd'

  component.$().trigger(e);

  Ember.run(function() {
    assert.equal( component.get('value'), '04 / 2015');
  });
});
