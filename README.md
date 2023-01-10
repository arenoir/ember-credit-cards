ember-credit-cards
==============================================================================

[![Build Status](https://travis-ci.org/arenoir/ember-credit-cards.svg)](https://travis-ci.org/arenoir/ember-credit-cards)
[![npm version](https://badge.fury.io/js/ember-credit-cards.svg)](https://badge.fury.io/js/ember-credit-cards)

A credit card utility library and form elements. Influenced by the [jquery.payment](https://github.com/stripe/jquery.payment) lib.

Checkout the [demo](https://arenoir.github.io/ember-credit-cards/).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-credit-cards
```


Usage (Components)
------------------------------------------------------------------------------

### CreditCardForm
Full credit card form with validations and formatting.

Arguments:
  * number
  * name
  * month
  * year
  * cvc
  * zipcode
  * zipcodeRequired

Events:
  * onUpdate
  * onValidate


Example:

``` hbs
<!-- templates/credit-cards/new.hbs -->
<div>
  <CreditCardForm
    @number={{this.number}}
    @name={{this.name}}
    @month={{this.month}}
    @year={{this.year}}
    @cvc={{this.cvc}}
    @onUpdate={{this.setValue}}
    @onValidate={{mut disabled}}
  />
</div>

<button {{action "save"}} disabled={{disabled}}>
  Save
</button>
```



### `<InputCreditCardNumber />`
Formats credit card number on entry. Discards non-numeric and extra characters. Parses sets number attribute.

Attributes:
  * number

### `<InputCreditCardCvc />`

Formats cvc number on entry. Discards non-numeric and extra characters. Parses sets cvc attribute.

Attributes:
  * cvc

### `<InputCreditCardExpiration />`

Validates and formats expiration date. Discards non-numeric and extra characters. Parses and sets month, year attributes.

Attributes:
  * month
  * year


### `<InputCreditCardZipcode />`

Validates and formats zip code. Discards non-numeric and extra characters. Sets zipcode attribute.

Attributes:
  * zipcode


## Validations

### validateNumber(number)

Validates a card number:

* Validates numbers
* Validates Luhn algorithm
* Validates length

Example:

``` javascript
import validations from 'ember-credit-cards/utils/validations';

validations.validateNumber('4242 4242 4242 4242'); //=> true
```

### validateCVC(cvc, type)

Validates a card CVC:

* Validates number
* Validates length to 4

Example:

``` javascript
import validations from 'ember-credit-cards/utils/validations';

validations.validateCVC('123'); //=> true
validations.validateCVC('123', 'amex'); //=> true
validations.validateCVC('1234', 'amex'); //=> true
validations.validateCVC('12344'); //=> false
```

### validateExpiration(month, year)

Validates a card expiration date:

* Validates numbers
* Validates in the future
* Supports year shorthand

Example:

``` javascript
import validations from 'ember-credit-cards/utils/validations';

validations.validateExpiration('05', '20'); //=> true
validations.validateExpiration('05', '2015'); //=> true
validations.validateExpiration('05', '05'); //=> false
```

### validateZipcode(number)

Validates a zip code:

* Validates 5 digit optional + 4 zipcode

Example:

``` javascript
import validations from 'ember-credit-cards/utils/validations';

validations.validateZipcode('94611'); //=> true
validations.validateZipcode('946'); //=> false
validations.validateZipcode('94611-2544'); //=> true
validations.validateZipcode('946112544'); //=> true
validations.validateZipcode('94611-24'); //=> false

```

# I18n

## Custom Labels

You can provide custom labels for localization.

``` hbs
  <CreditCardForm
    @number={{this.number}}
    @name={{this.name}}
    @month={{this.month}}
    @year={{this.year}}
    @cvc={{this.cvc}}
    @numberLabel={{t 'credit-card-form.number'}}
    @securityCodeLabel={{t 'credit-card-form.security-code'}}
    @nameOnCardLabel={{t 'credit-card-form.name-on-card'}}
    @expirationLabel={{t 'credit-card-form.expiration'}}
    @zipCodeLabel={{t 'credit-card-form.zip-code'}}
    @onUpdate={{this.setValue}}
    @onValidate={{mut disabled}}
  />
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
