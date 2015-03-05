import Ember from 'ember';
import HasSlectedTextMixin from '../../../mixins/has-slected-text';
import { module, test } from 'qunit';

module('HasSlectedTextMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var HasSlectedTextObject = Ember.Object.extend(HasSlectedTextMixin);
  var subject = HasSlectedTextObject.create();
  assert.ok(subject);
});
