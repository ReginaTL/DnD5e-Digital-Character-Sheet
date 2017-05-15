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

.factory('Character', function($cordovaSQLite, $q, $ionicPlatform, $rootScope, Database) {

  // Executes any query will print to console any errors
  this.getById = function (id) {
    var character;
    return Database.executeQuery("SELECT * FROM character WHERE id = ?", [id]).then(function(result){
      for (var i = 0; i < result.rows.length; i++) {
         character = {
          id: result.rows.item(i).id,
          name: result.rows.item(i).name,
          race: result.rows.item(i).race,
          class: result.rows.item(i).class,
          level: result.rows.item(i).level,
          experience: result.rows.item(i).experience,
          alignment: result.rows.item(i).alignment,
          background: result.rows.item(i).background,
          hp: result.rows.item(i).hp,
          speed: result.rows.item(i).speed,
          proficiency: result.rows.item(i).proficiency,
          hitdice: result.rows.item(i).hitdice,
          ac: result.rows.item(i).ac,
          strength: result.rows.item(i).strength,
          intelligence: result.rows.item(i).intelligence,
          constitution: result.rows.item(i).constitution,
          dexterity: result.rows.item(i).dexterity,
          charisma: result.rows.item(i).charisma,
          wisdom: result.rows.item(i).wisdom,
          spellAbility: result.rows.item(i).spellAbility,
          spellSaveDC: result.rows.item(i).spellSaveDC,
          spellAttackBonus: result.rows.item(i).spellAttackBonus,
          pp: result.rows.item(i).pp,
          gp: result.rows.item(i).gp,
          ep: result.rows.item(i).ep,
          sp: result.rows.item(i).sp,
          cp: result.rows.item(i).cp
        }
      }
      return character;
    });
  }

  return this;
})
