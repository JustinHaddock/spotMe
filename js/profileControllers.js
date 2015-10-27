var profileControllers = angular.module('profileControllers', ['ngDialog', 'firebase']);
var ref = new Firebase("https://spotmee.firebaseio.com");


profileControllers.controller("profileController", ['$scope', '$state', 'profileInfo', 'profileFactory', function($scope, $state, profileInfo, profileFactory) {
  if (profileFactory.uid == null){
    $state.go('login');
  }
  console.log(profileInfo);
  console.log(profileFactory.uid);
}]);
