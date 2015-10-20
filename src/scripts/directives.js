angular.module('app')
.directive('header', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/header.html',
    scope: true,
    link: function (scope, elem, attrs) {
      
    }
  };
}])
.directive('footer', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/footer.html',
    replace: true,
    scope: true,
    link: function (scope, elem, attrs) {
      
    }
  };
}])
.directive('message', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/message.html',
    scope: {
      text: '='
    },
    link: function (scope, elem, attrs) {
      
    }
  };
}]);