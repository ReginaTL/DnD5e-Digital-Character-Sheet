// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // Open the Database
    if (window.cordova) {
        // App/device syntax
        $rootScope.db = $cordovaSQLite.openDB({ name: "database.db" });
    } else {
        // Ionic serve syntax
        $rootScope.db = window.openDatabase("database.db", '1.0', 'App Demo', 65536);
    }

    // Setup Tables
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE character(id INT PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), race VARCHAR(255), class VARCHAR(255), level INT, experience INT, alignment VARCHAR(255), background VARCHAR(255), hp INT, speed INT, proficiency INT, hitdice VARCHAR(55), ac INT, strength INT, intelligence INT, constitution INT, dexterity INT, charisma INT, wisdom INT, spellAbility VARCHAR(255), spellSaveDC INT, spellAttackBonus INT, pp INT, gp INT, ep INT, sp INT, cp INT);");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE skills(name VARCHAR(255) PRIMARY KEY, baseType VARCHAR(3));");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE equipment(id INT PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), damageType VARCHAR(255), damageDice, VARCHAR(255), bonus INT);");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE char_equip(charID INT, equipID INT);");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE spells(id INT PRIMARY KEY AUTOINCREMENT, level INT);");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE char_spells(charID INT, spellID INT);");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE languages(id INT PRIMARY KEY AUTOINCREMENT, name VARCHAR(255));");
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE char_lang(charID INT, langID INT);");
    // Setup Skils - always the same
    $cordovaSQLite.execute($rootScope.db, "INSERT INTO skills(name, basType) VALUES('Acrobatics', 'DEX'),('Animal Handling', 'WIS'), ('Arcana', 'INT'), ('Athletics', 'STR'), ('Deception', 'CHA'), ('History', 'INT'), ('Insight', 'WIS'), ('Intimidation', 'CHA'), ('Invesitgation', 'INT'), ('Medicine', 'WIS'), ('Nature', 'INT'), ('Perception', 'WIS'), ('Performance', 'CHA'), ('Persuasion', 'CHA'), ('Religion', 'CHA'), ('Sleight of Hand', 'DEX'), ('Stealth', 'DEX'), ('Survival', 'WIS');");
    // Setup example data
    $cordovaSQLite.execute($rootScope.db, "INSERT INTO character(name, race, class, level, experience, alignment, background, hp, speed, proficiency, hitdice, ac, strength, intelligence, constitution, dexterity, charisma, wisdom, spellAbility, spellSaveDC, spellAttackBonus, pp, gp, ep, sp, cp) VALUES ('Madame Daphne Blanchet Benoist', 'Tiefling', 'Warlock', 5, 0, 'neutral', 'courtier', 27, 30, 3, '5d8', 14, 12, 16, 15, 15, 19, 18, 'CHA', 15, 6, 45, 220, 0, 0, 0);");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
