import Ember from 'ember';
import cards from 'ember-credit-cards/utils/cards';

var isEmpty = Ember.isEmpty;
var cardFromNumber = cards.fromNumber;

export default function formatNumber(num) {
  num = (num + '').replace(/\D/g, '');
  
  var card = cardFromNumber(num);
  
  if (!card) {
    return num;
  }

  var upperLength = card.length[card.length.length - 1];
  
  num = num.slice(0, upperLength);
  
  if (card.format.global) {
    var ref = num.match(card.format);

    return ref != null ? ref.join(' ') : '';
  } else {
    var groups = card.format.exec(num);
    
    if (groups == null) {
      return;
    }
    
    groups.shift();

    groups = groups.filter(function(g) {
      return !isEmpty(g);
    });
    
    return groups.join(' ');
  }
}