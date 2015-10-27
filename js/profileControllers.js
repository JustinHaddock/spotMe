var profileControllers = angular.module('profileControllers', ['ngDialog', 'firebase']);
var ref = new Firebase("https://spotmee.firebaseio.com");


profileControllers.controller("profileController", ['$scope', '$state', 'profileFactory', function($scope, $state, profileFactory) {
  var profC = this;

  if (profileFactory.uid == null){
    $state.go('login');
  }


  profileFactory.find(profileFactory.uid).then(function(data){
    var profNum = data.$indexFor(profileFactory.uid);
    profC.profileInfo = data[profNum];

  })

  return profC;
}]);
