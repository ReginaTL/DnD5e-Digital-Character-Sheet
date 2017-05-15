angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    $rootScope.$broadcast('update');
  });

  var isEdit = false;

  $scope.switchEdit = function(){
    if(!isEdit){
      isEdit = true;
      $state.go('app.stats-edit');
    }
    else {
      isEdit = false;
      $state.go('app.stats');
    }
  };

})

.controller('StatsCtrl', function($scope, $stateParams, $ionicPopup, Database, Character) {
  $scope.$on('update', function(event, args) {
    Character.getById(1).then(function(json){
      $scope.character = json;
      $scope.initiative = Math.floor((json.dexterity-10)/2);
    });
  });

  Character.getById(1).then(function(json){
    $scope.character = json;
    $scope.initiative = Math.floor((json.dexterity-10)/2);
  });

  $scope.hpPopup = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.currHP">',
    title: 'Max HP: ' + $scope.character.hp,
    subTitle: 'Enter Current HP:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setCurrHP(1, $scope.data.currHP);
          Character.getById(1).then(function(json){
            $scope.character = json;
            $scope.initiative = Math.floor((json.dexterity-10)/2);
          });
        }
      }
    ]
    });
  };

  $scope.calculateModifier = function(stat){
    return Math.floor((stat-10)/2);
  };
})

.controller('StatsEditCtrl', function($scope, $stateParams, $ionicPopup, Database, Character) {
  Character.getById(1).then(function(json){
    $scope.character = json;
    $scope.initiative = Math.floor((json.dexterity-10)/2);
  });

  $scope.hpEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.currHP">',
    title: 'Current Max HP: ' + $scope.character.hp,
    subTitle: 'Enter New Max HP:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setHP(1, $scope.data.currHP);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.calculateModifier = function(stat){
    return Math.floor((stat-10)/2);
  };
});
