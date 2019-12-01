import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';
import { module, test } from 'qunit';

module('Unit | Utility | is digit keypress', function() {
  test('it returns false if event is a keypress is letter', function(assert) {
    var e = {
      keyCode: 70
    };

    var result = isDigitKeypress(e);
    
    assert.equal(result, false);
  });


  test('it returns true if keycode is a number', function(assert) {
    var e = {
      keyCode: 50
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });

  test('it returns true if keypress is a number', function(assert) {
    var e = {
      which: 50
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });


  test('it returns true if keypress is a backspace', function(assert) {
    var e = {
      keyCode: 8
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });

  test('it returns true if keypress is a tab', function(assert) {
    var e = {
      keyCode: 9
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });

  test('it returns true if keypress is delete', function(assert) {
    var e = {
      keyCode: 46
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });

  test('it returns true if keypress is enter', function(assert) {
    var e = {
      keyCode: 13
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });

  test('it returns true if keypress is escape', function(assert) {
    var e = {
      keyCode: 27
    };
    
    var result = isDigitKeypress(e);
    
    assert.equal(result, true);
  });
});