angular.module('starter.services', ['ngCordova'])

.factory('Database', function($cordovaSQLite, $q, $ionicPlatform, $rootScope) {

  // Executes any query will print to console any errors
  this.executeQuery = function (query, parameters) {
    parameters = parameters || [];
    var prom = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute($rootScope.db, query, parameters)
        .then(function (result) {
          prom.resolve(result);
        }, function (error) {
          console.log('Error in executeQuery');
          console.log(error);
          prom.reject(error);
        });
    });
    return prom.promise;
  }

  return this;
})
