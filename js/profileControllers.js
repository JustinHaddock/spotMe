var profileControllers = angular.module('profileControllers', ['ngDialog']);
var ref = new Firebase("https://spotmee.firebaseio.com");


profileControllers.controller("profileController", ['$scope', 'ngDialog', '$location', function($scope, ngDialog, $location) {
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
