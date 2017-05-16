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
      $state.go($state.current.name + '-edit');
    }
    else {
      isEdit = false;
      $state.go($state.current.name.replace('-edit', ''));
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
          Character.setData('currHP', 1, $scope.data.currHP);
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
    if (Math.floor((stat-10)/2) < 0) {
      return Math.floor((stat-10)/2);
    }
    else {
      return ("+"+Math.floor((stat-10)/2));
    }
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
    template: '<input type="text" ng-model="data.hp">',
    title: 'Current Max HP: ' + $scope.character.hp,
    subTitle: 'Enter New Max HP:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('hp', 1, $scope.data.hp);
          Character.getById(1).then(function(json){
            $scope.character = json;
            $scope.initiative = Math.floor((json.dexterity-10)/2);
          });
        }
      }
    ]
    });
  };

  $scope.speedEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Speed: ' + $scope.character.speed,
    subTitle: 'Enter New Speed:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('speed', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.proficiencyEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Proficiency: ' + $scope.character.proficiency,
    subTitle: 'Enter New Proficiency:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('proficiency', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.hitDiceEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Hit Dice: ' + $scope.character.hitdice,
    subTitle: 'Enter New Hit Dice:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('hitdice', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.acEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Armor Class: ' + $scope.character.ac,
    subTitle: 'Enter New Armor Class:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('ac', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.strEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Strength: ' + $scope.character.strength,
    subTitle: 'Enter New Strength:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('strength', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.intEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Intelligence: ' + $scope.character.intelligence,
    subTitle: 'Enter New Intelligence:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('intelligence', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.conEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Constitution: ' + $scope.character.constitution,
    subTitle: 'Enter Constitution:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('constitution', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.wisEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Wisdom: ' + $scope.character.wisdom,
    subTitle: 'Enter Wisdom:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('wisdom', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.dexEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Dexterity: ' + $scope.character.dexterity,
    subTitle: 'Enter Dexterity:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('dexterity', 1, $scope.data.input);
          Character.getById(1).then(function(json){
            $scope.character = json;
            $scope.initiative = Math.floor((json.dexterity-10)/2);
          });
        }
      }
    ]
    });
  };

  $scope.chaEdit = function(){
    $scope.data = {};

    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.input">',
    title: 'Current Charisma: ' + $scope.character.charisma,
    subTitle: 'Enter Charisma:',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button my-red',
        onTap: function(e) {
          Character.setData('charisma', 1, $scope.data.input);
          Character.getById(1).then(function(json){$scope.character = json;});
        }
      }
    ]
    });
  };

  $scope.calculateModifier = function(stat){
    return Math.floor((stat-10)/2);
  };
})

.controller('SkillsCtrl', function($scope, $stateParams, $ionicPopup, Database, Skills, Character) {
  Character.getById(1).then(function(json){$scope.character = json;});

  $scope.calculateModifier = function(stat){
    if (Math.floor((stat-10)/2) < 0) {
      return Math.floor((stat-10)/2);
    }
    else {
      return ("+"+Math.floor((stat-10)/2));
    }

  };

  Skills.getAll().then(function(json){
    $scope.skills = json.skills;
  });

  $scope.calculateBonus = function(skill){
      var mod = 0;
      if (skill.proficient) {
        mod = parseInt($scope.character.proficiency);
      }

      if (skill.baseType == "DEX") {
        mod += parseInt($scope.calculateModifier($scope.character.dexterity));
      }
      else if (skill.baseType == "STR") {
        mod += parseInt($scope.calculateModifier($scope.character.strength));
      }
      else if (skill.baseType == "CHA") {
        mod += parseInt($scope.calculateModifier($scope.character.charisma));
      }
      else if (skill.baseType == "CON") {
        mod += parseInt($scope.calculateModifier($scope.character.constitution));
      }
      else if (skill.baseType == "WIS") {
        mod += parseInt($scope.calculateModifier($scope.character.wisdom));
      }
      else if (skill.baseType == "INT") {
        mod += parseInt($scope.calculateModifier($scope.character.intelligence));
      }

      if(mod > 0){
        return "+"+mod;
      }
      return mod;
  };

});
