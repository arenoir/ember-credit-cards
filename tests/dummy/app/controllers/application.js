import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked
  name;

  @tracked
  number;

  @tracked
  cvc;

  @tracked
  month;

  @tracked
  year;

  @action
  setValue(key, value) {
    this[key] = value;
  }
}
