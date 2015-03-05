# Ember-credit-cards 

[![Build Status](https://travis-ci.org/arenoir/ember-credit-cards.svg)](https://travis-ci.org/arenoir/ember-credit-cards)

A credit card utility library and form elements. Most of the utilty functions are copied from the [jquery.payment](https://github.com/stripe/jquery.payment) lib.

Checkout the [demo](http://arenoir.github.io/ember-credit-cards/).

## Components

### credit-card-form
Full credit card form with validations and formatting.

Attributes: 
  * number
  * name
  * month
  * year
  * cvc

Events:
  * on-validate


Example:

``` html
//templates/credit-cards/new.hbs

  <div>
    {{ credit-card-form 
       number=attrs.number 
       name=attrs.name 
       month=attrs.month 
       year=attrs.year 
       cvc=attrs.cvc 
       on-validate="validate"
    }}
  </div>

  <button {{action "save"}} {{bind-attr disabled="disabled"}}>
    Save
  </button>

```


``` javascript
//routes/credit-cards/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    validate: function(bool) {
      this.controller.set('disabled', !bool);
    }
  }
});
```


### input-credit-card-number
Formats credit card number on entry. Discards non-numeric and extra characters. Parses sets number attribute. 

Attributes:
  * number

### input-credit-card-cvc

Formats cvc number on entry. Discards non-numeric and extra characters. Parses sets cvc attribute. 

Attributes:
  * cvc

### input-credit-card-expiration

Validates and formats expiration date. Discards non-numeric and extra characters. Parses and sets month, year attributes. 

Attributes:
  * month
  * year


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


