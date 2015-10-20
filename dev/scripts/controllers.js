angular.module('app')
  .controller('RootController', ['$scope', function ($scope) {

  }])
  .controller('RootDummyController', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
    $scope.dummy = DummyFactory;
  }])
  .controller('FilterController', ['$scope', function ($scope) {
    $scope.items = [
      {name: 'Tobias'},
      {name: 'Jeff'},
      {name: 'Brian'},
      {name: 'Igor'},
      {name: 'James'},
      {name: 'Brad'}
    ];
    $scope.greeting = 'hello';
  }]);
