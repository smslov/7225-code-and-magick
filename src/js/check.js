var getMessage = function(a, b) {
  if(typeof a == 'boolean') {
    if(a) {
      return('Я попал в ' + b);
    }
    else {
      return('Я никуда не попал');
    }
  }
  else if(typeof a == 'number') {
    return('Я прыгнул на ' + (a * 100) + ' сантиметров');
  }
  else if(Array.isArray(a)) {
    if(Array.isArray(b)) {
      var distancePath = a.reduce(function(pv,cv,i) { // заменил цикл на метод reduce
        return pv + cv*b[i]
        }, 0);
      // var distancePath = 0;
      // for (var i = 0; i < a.length && i < b.length; i++) {
      //   distancePath += a[i] * b[i];
      // }
      return('Я прошёл ' + distancePath + ' метров');
    }
    else {
      var numberOfSteps = a.reduce(function(pv, cv) { // заменил цикл на метод reduce
        return pv + cv;
        });
      // for (var i = 0; i < a.length; i++) {
      //   numberOfSteps += a[i];
      // }
      return('Я прошёл ' + numberOfSteps + ' шагов');
    }
  }
  else {
    return('Переданы некорректные данные');
  }
}
