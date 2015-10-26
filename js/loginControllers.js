var userControllers = angular.module('userControllers', ['ngDialog']);
var ref = new Firebase("https://spotmee.firebaseio.com");


userControllers.controller("userManagement", ['$scope', 'ngDialog', '$location', function($scope, ngDialog, $location) {
    this.email = "";
    this.pass = "";
    this.emessage = ""  ;

    this.create = function(){
        ngDialog.openConfirm({
            className: 'ngdialog-theme-default',
            template: 'partials/createUser.html',
            controller: "createController as create",
            scope: $scope
        })
    }
    return this;
}]);

userControllers.controller("createController", ['$scope', function($scope){
    var create = this;
    create.email = "";
    create.pass = "";
    create.pass2 = "";
    create.emessage = "";

    create.checkFields = function(){
      var passes = true;
      if (create.pass != create.pass2){
        create.emessage = "passwords must match";
        passes = false;
      }
      var lastOfEmail;
      if (passes && create.email.length < 7){
        create.emessage = "email not long enough" ;
        passes = false;
      }
      if (passes){
        lastOfEmail = create.email.substr(create.email.length - 7)
        if (passes && lastOfEmail != "rit.edu"){
          create.emessage = "please use RIT email";
          passes = false;
        }
      }
      if (passes){
        console.log('passed!');
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
                console.log("Success!");
                var uid = userData.uid;
                console.log(uid);
                $scope.closeThisDialog(0);
            }
        });
    }
    return create;
}])
