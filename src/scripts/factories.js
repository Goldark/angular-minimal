angular.module('app')
  .factory('DummyFactory', ['DummyService', function (DummyService) {
    var obj = {
      message: DummyService.message
    };
    return obj;
  }]);