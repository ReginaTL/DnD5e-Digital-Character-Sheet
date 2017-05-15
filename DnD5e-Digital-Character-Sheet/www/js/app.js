// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.services'])

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

    // Reset database when necessary on browser
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE character;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE skills;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE equipment;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE char_equip;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE spells;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE char_spells;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE languages;");
    $cordovaSQLite.execute($rootScope.db, "DROP TABLE char_lang;");

    // Setup Tables
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS character(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, race TEXT, class TEXT, level INT, experience INT, alignment TEXT, background TEXT, hp INT, currHP INT, speed INT, proficiency INT, hitdice TEXT, ac INT, strength INT, intelligence INT, constitution INT, dexterity INT, charisma INT, wisdom INT, spellAbility TEXT, spellSaveDC INT, spellAttackBonus INT, pp INT, gp INT, ep INT, sp INT, cp INT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS skills(name TEXT, baseType TEXT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS equipment(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, damageType TEXT, damageDice, TEXT, bonus INT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS char_equip(charID INT, equipID INT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS spells(id INTEGER PRIMARY KEY AUTOINCREMENT, level INT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS char_spells(charID INT, spellID INT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS languages(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);").then(function(result){},function(error){console.log(error);});
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS char_lang(charID INT, langID INT);").then(function(result){},function(error){console.log(error);});
    // Setup Skills - always the same
    $cordovaSQLite.execute($rootScope.db, "INSERT INTO skills(name, baseType) VALUES('Acrobatics', 'DEX'),('Animal Handling', 'WIS'), ('Arcana', 'INT'), ('Athletics', 'STR'), ('Deception', 'CHA'), ('History', 'INT'), ('Insight', 'WIS'), ('Intimidation', 'CHA'), ('Invesitgation', 'INT'), ('Medicine', 'WIS'), ('Nature', 'INT'), ('Perception', 'WIS'), ('Performance', 'CHA'), ('Persuasion', 'CHA'), ('Religion', 'CHA'), ('Sleight of Hand', 'DEX'), ('Stealth', 'DEX'), ('Survival', 'WIS');").then(function(result){},function(error){console.log(error);});
    // Setup example data
    $cordovaSQLite.execute($rootScope.db, "INSERT INTO character(name, race, class, level, experience, alignment, background, hp, currHP, speed, proficiency, hitdice, ac, strength, intelligence, constitution, dexterity, charisma, wisdom, spellAbility, spellSaveDC, spellAttackBonus, pp, gp, ep, sp, cp) VALUES ('Madame Daphne Blanchet Benoist', 'Tiefling', 'Warlock', 5, 0, 'neutral', 'courtier', 27, 20, 30, 3, '5d8', 14, 12, 16, 15, 15, 19, 18, 'CHA', 15, 6, 45, 220, 0, 0, 0);").then(function(result){},function(error){console.log(error);});
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

  .state('app.stats', {
    url: '/stats',
    views: {
      'menuContent': {
        templateUrl: 'templates/stats.html',
        controller: 'StatsCtrl'
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
  $urlRouterProvider.otherwise('/app/stats');
});
