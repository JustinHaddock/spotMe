var profileFactory = angular.module('profileFactory', []);
var ref = new Firebase("https://spotmee.firebaseio.com");

profileFactory.factory("profileFactory", ['$q', '$firebaseArray', function( $q, $firebaseArray ) {
  var proff = {};

  proff.uid = null;


  proff.find = function(uid) {
    var deferred = $q.defer();

    var allData = $firebaseArray(ref.child('members'))

    allData.$loaded().then(function() {
        deferred.resolve(allData)
      })
      .catch(function(error) {
        deferred.reject(error);
      });
// .$getRecord(proff.uid)
    return deferred.promise;
  };

  return proff

}]);
