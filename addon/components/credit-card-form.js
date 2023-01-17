import Component from '@glimmer/component';
import { action } from '@ember/object';
import Validations from 'ember-credit-cards/utils/validations';
import Cards from 'ember-credit-cards/utils/cards';

export default class CreditCardFormComponent extends Component {
  get isValid() {
    return (
      this.nameValid &&
      this.numberValid &&
      this.expirationValid &&
      this.cvcValid &&
      this.zipcodeValid
    );
  }

  get nameValid() {
    var name = this.args.name;

    if (name) {
      return true;
    }

    return false;
  }

  get numberValid() {
    return Validations.validateNumber(this.args.number);
  }

  get expirationValid() {
    var month = this.args.month;
    var year = this.args.year;

    return Validations.validateExpiration(month, year);
  }

  get cvcValid() {
    var cvc = this.args.cvc;
    var type = this.type;

    return Validations.validateCVC(cvc, type);
  }

  get zipcodeValid() {
    if (this.args.zipcodeRequired) {
      var zip = this.args.zipcode;

      return Validations.validateZipcode(zip);
    }

    return true;
  }

  get type() {
    var number = this.args.number;
    var card = Cards.fromNumber(number);

    if (card) {
      return card.type;
    } else {
      return '';
    }
  }

  @action
  setValue(key, value) {
    this.args.onUpdate(key, value);
    this._onValidate();
  }

  _onValidate() {
    (this.args.onValidate || (() => {}))(this.isValid);
  }
}
