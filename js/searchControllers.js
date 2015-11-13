var searchControllers = angular.module('searchControllers', ['ngDialog']);
var ref = new Firebase("https://spotmee.firebaseio.com");

searchControllers.controller("searchController", ['$scope', 'profileFactory', '$state', '$timeout', function($scope, profileFactory, $state, $timeout) {
  var search = this;
  search.allUsers = [];
  search.usersReady = false;

  ref.onAuth(function(authData) {
    if (authData) {
      profileFactory.uid = authData.uid;
      profileFactory.init(); 
      localStorage.setItem('uid', authData.uid)
    } else {
      profileFactory.uid = null;
      $state.go('login');
    }
  });

  if (profileFactory.hasUsersReady()) {
    var index = profileFactory.users.$indexFor(profileFactory.uid);
    search.allUsers = profileFactory.users;
    if (index > -1) {
      search.allUsers.splice(index, 1);
    }
    search.usersReady = true;
  }

  else {
    profileFactory.getUsers().then(function(data) {
      var index = data.$indexFor(profileFactory.uid);
      $timeout(search.allUsers = data);
      if (index > -1) {
        search.allUsers.splice(index, 1);
      }
      search.usersReady = true;
    })
  }
  return search;
}]);
