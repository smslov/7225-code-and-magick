'use strict';
function getMessage(a, b) {
  if(typeof a === 'boolean') {
    if(a) {
      return('Я попал в ' + b);
    } else {
      return('Я никуда не попал');
    }
  } else if(typeof a === 'number') {
    return('Я прыгнул на ' + (a * 100) + ' сантиметров');
  } else if(Array.isArray(a)) {
    if(Array.isArray(b)) {
      var distancePath = a.reduce(function(pv, cv, i) {
        return pv + cv * b[i];
    }, 0);
      return('Я прошёл ' + distancePath + ' метров');
    } else {
      var numberOfSteps = a.reduce(function(pv, cv) {
        return pv + cv;
      });
      return('Я прошёл ' + numberOfSteps + ' шагов');
    }
  } else {
    return('Переданы некорректные данные');
  }
}
