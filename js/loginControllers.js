var userControllers = angular.module('userControllers', ['ngDialog']);
var ref = new Firebase("https://spotmee.firebaseio.com");


userControllers.controller("userManagement", ['$scope', 'ngDialog', '$location', 'profileFactory', '$state', function($scope, ngDialog, $location, profileFactory, $state) {
  this.email = "";
  this.pass = "";
  this.emessage = "";

  ref.onAuth(function(authData) {
    if (authData) {
      profileFactory.uid = authData.uid;
      profileFactory.init(); 
      localStorage.setItem('uid', authData.uid)
      if ($location.path() == '/login') {
        $state.go('profile');
      }
    } else {
      profileFactory.uid = null;
      $state.go('login');
    }
  });

  this.login = function() {
    ref.authWithPassword({
      email: this.email,
      password: this.pass,
      remember: "default"
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        this.emessage = error.message;
        console.log(this.emessage);
        $scope.$apply();
      } else {
        console.log("logging in");
        profileFactory.uid = authData.uid;
        console.log(profileFactory);
        $state.go('profile');
        console.log($state.go('profile'));
      }
    }.bind(this));
  }

  this.create = function() {
    ngDialog.openConfirm({
      className: 'ngdialog-theme-default',
      template: 'partials/createUser.html',
      controller: "createController as create",
      scope: $scope
    })
  }
  return this;
}]);

userControllers.controller("createController", ['$scope', '$state', 'profileFactory', function($scope, $state, profileFactory) {
  var create = this;
  create.email = "";
  create.pass = "";
  create.pass2 = "";
  create.emessage = "";

  create.checkFields = function() {
    var passes = true;
    if (create.pass != create.pass2) {
      create.emessage = "passwords must match";
      passes = false;
    }
    var lastOfEmail;
    if (passes && create.email.length < 7) {
      create.emessage = "email not long enough to be real";
      passes = false;
    }
    if (passes) {
      lastOfEmail = create.email.substr(create.email.length - 7)
      if (passes && lastOfEmail != "rit.edu") {
        create.emessage = "please use RIT email";
        passes = false;
      }
    }
    if (passes) {
      create.addUser(create.email, create.pass);
    }
  }

  create.addUser = function(em, pass) {
    ref.createUser({
      email: em,
      password: pass
    }, function(error, userData) {
      if (error) {
        create.emessage = "Entered email is invalid";
        $scope.$apply();
      } else {
        $scope.closeThisDialog(0);
        var uid = userData.uid;
        profileFactory.uid = userData.uid;
        ref.child('members').child(userData.uid).set({
          name: "newUser"
        })
        $state.go('profile');
      }
    });
  };
  return create;
}]);
