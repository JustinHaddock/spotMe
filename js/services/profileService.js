var profileFactory = angular.module('profileFactory', []);
var ref = new Firebase("https://spotmee.firebaseio.com");

profileFactory.factory("profileFactory", ['$q', '$firebaseArray', function($q, $firebaseArray) {
  var proff = {};
  proff.uid = null;
  proff.users = [];
  proff.thisUser = {};


  proff.getUsers = function() {
    var deferred = $q.defer();
    var allData = $firebaseArray(ref.child('members'))
    allData.$loaded().then(function() {
        deferred.resolve(allData)
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  proff.hasUsersReady = function() {
    if (proff.users.length == 0) {
      return false;
    }
    console.log("groovy");
    return true;
  }

  proff.findUser = function(uid) {
    var index = proff.users.$indexFor(uid);
    return proff.users[index];
  }

  proff.init = function() {
    proff.getUsers().then(function(data) {
      var profNum = data.$indexFor(proff.uid);
      proff.users = data;
      var index = data.$indexFor(proff.uid);
      proff.thisUser = data[index];
    })
  }
  
  return proff;
}]);
