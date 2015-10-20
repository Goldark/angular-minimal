angular.module('app')
  .config(['$urlRouterProvider',
  '$stateProvider',
  'localStorageServiceProvider',
  function ($urlRouterProvider, $stateProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('app');
    $urlRouterProvider.otherwise('/root/dummy');
    $stateProvider
      .state('root', {
        url: '/root',
        templateUrl: 'partials/root/index.html',
        controller: 'RootController'
      })
      .state('root.dummy', {
        url: '/dummy',
        templateUrl: 'partials/root/dummy.html',
        controller: 'RootDummyController'
      });
  }]);