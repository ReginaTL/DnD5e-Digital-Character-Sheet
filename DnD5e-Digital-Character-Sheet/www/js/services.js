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
          currHP: result.rows.item(i).currHP,
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

  this.setData = function(property, id, newVal){
    return Database.executeQuery("UPDATE character SET "+property+" = ? WHERE id = ?;", [newVal, id]);
  }

  return this;
})

.factory('Skills', function($cordovaSQLite, $q, $ionicPlatform, $rootScope, Database) {

  // Executes any query will print to console any errors
  this.getAll = function () {
    var data = {
      skills: []
    };
    return Database.executeQuery("SELECT skills.name, skills.baseType, "+
      "char_skills.proficient FROM skills "+
      "JOIN char_skills ON skills.name = char_skills.skillName WHERE char_skills.charID = 1;", []).then(function(result){
      for (var i = 0; i < result.rows.length; i++) {
        var val = false;
        if (result.rows.item(i).proficient == 1) {
          val = true;
        }
         data.skills.push({
           name: result.rows.item(i).name,
           baseType: result.rows.item(i).baseType,
           proficient: val
         });
      }
      return data;
    });
  }

  return this;
})

.factory('Languages', function($cordovaSQLite, $q, $ionicPlatform, $rootScope, Database) {

  // Executes any query will print to console any errors
  this.getAll = function () {
    var data = {
      langs: []
    };
    return Database.executeQuery("SELECT languages.name"+
      " FROM languages JOIN char_lang ON "+
      "languages.id = char_lang.langID WHERE char_lang.charID = 1;", []).then(function(result){
      for (var i = 0; i < result.rows.length; i++) {
         data.langs.push({
           name: result.rows.item(i).name,
         });
      }
      return data;
    });
  }

  this.setData = function(currName, langName){
    return Database.executeQuery("UPDATE languages SET name = ? WHERE name = ?;", [langName, currName]);
  }

  this.insertData = function(name){
    Database.executeQuery("INSERT INTO languages (name) VALUES (?);", [name]);
    Database.executeQuery("SELECT id FROM languages WHERE name = ?;", [name]).then(function(result){
      id = result.rows.item(0).id;
      Database.executeQuery("INSERT INTO char_lang (charID, langID) VALUES (1, ?);", [id]);
      $rootScope.$broadcast('update');
      //console.log("Finished service");
    });
  }

  return this;
})
