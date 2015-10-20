angular.module('app')
  .filter('reverseFilter', [function () {
    return function (input, uppercase) {
      input = input || '';
      var out = '';
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out;
      }
      if (uppercase) {
        out = out.toUpperCase();
      }
      return out;
    };
}]);