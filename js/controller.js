var userController = angular.module('userController', ['ngDialog']);
// var ref = new Firebase("https://spotmee.firebaseio.com");


userController.controller("userManagement", ['$scope', 'ngDialog', '$location', function($scope, ngDialog, $location) {
    this.email = "";
    this.pass = "";
    this.emessage = ""  ;

    this.create = function(){
        console.log("trying");
        ngDialog.openConfirm({
            className: 'ngdialog-theme-default',
            template: 'partials/createUser.html',
            scope: $scope
        })
    }
    return this;
}]);

// userController.controller("createController", ['$scope', function($scope){
//     var create = this;
//     create.email = $scope.email;
//     create.pass = $scope.password;
//     create.emessage = "";
//
//     create.addUser = function() {
//         ref.createUser({
//             email: create.email,
//             password: create.pass
//         }, function(error, userData) {
//             if (error) {
//                 create.emessage = "Entered email is invalid";
//                 $scope.$apply();
//             } else {
//                 console.log("Success!");
//                 var uid = userData.uid
//
//                 ref.child(uid).child("1").update({
//                     "name": "Project 1"
//                 })
//                 ref.child(uid).child("2").update({
//                     "name": "Project 2"
//                 })
//                 ref.child(uid).child("3").update({
//                     "name": "Project 3"
//                 })
//                 $scope.closeThisDialog(0);
//             }
//         });
//     }
//     return create;
// }])
